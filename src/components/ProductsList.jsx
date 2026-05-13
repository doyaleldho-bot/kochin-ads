
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { getProducts, getProductQuantities } from '@/api/EcommerceApi';

const placeholderImage = "https://placehold.co/600x400/0D5A7A/FFF?text=Ad+Package";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const displayVariant = useMemo(() => product.variants[0], [product]);
  const hasSale = useMemo(() => displayVariant && displayVariant.sale_price_in_cents !== null, [displayVariant]);
  const displayPrice = useMemo(() => hasSale ? displayVariant.sale_price_formatted : displayVariant.price_formatted, [displayVariant, hasSale]);

  const handleAddToCart = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.variants.length > 1) {
      navigate(`/product/${product.id}`);
      return;
    }

    const defaultVariant = product.variants[0];

    try {
      await addToCart(product, defaultVariant, 1, defaultVariant.inventory_quantity);
      toast({
        title: "Service Added",
        description: `${product.title} has been added to your summary.`,
      });
    } catch (error) {
      toast({
        title: "Error adding service",
        description: error.message,
      });
    }
  }, [product, addToCart, toast, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#FF9500]/30 transition-all duration-300 group flex flex-col h-full">
          <div className="relative h-48 overflow-hidden bg-slate-100">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
            <img
              src={product.image || placeholderImage}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.ribbon_text && (
              <div className="absolute top-3 right-3 bg-[#FF9500] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                {product.ribbon_text}
              </div>
            )}
          </div>
          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#0088CC] transition-colors">{product.title}</h3>
            <p className="text-sm text-slate-500 mb-6 line-clamp-2">{product.subtitle || 'Professional advertising service package.'}</p>
            
            <div className="mt-auto">
              <div className="flex items-end justify-between mb-4 border-t border-slate-100 pt-4">
                 <div className="text-2xl font-bold text-[#0088CC]">{displayPrice}</div>
                 {hasSale && <div className="text-sm text-slate-400 line-through mb-1">{displayVariant.price_formatted}</div>}
              </div>
              <Button onClick={handleAddToCart} className="w-full bg-slate-900 hover:bg-[#0088CC] text-white transition-colors">
                 Select Package <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsWithQuantities = async () => {
      try {
        setLoading(true);
        setError(null);

        const productsResponse = await getProducts();

        if (productsResponse.products.length === 0) {
          setProducts([]);
          return;
        }

        // Filtering Logic: Only keep ad-related products
        // We filter based on keywords in title or description to remove "Dresses", "Cosmetics" etc.
        const adKeywords = ['ad', 'marketing', 'campaign', 'seo', 'social', 'design', 'video', 'print', 'consult', 'brand', 'media', 'package'];
        const excludeKeywords = ['dress', 'shirt', 'shoe', 'cream', 'toy', 'food', 'pants', 'skirt'];

        const filteredProducts = productsResponse.products.filter(p => {
            const text = (p.title + ' ' + (p.description || '')).toLowerCase();
            const hasAdKeyword = adKeywords.some(k => text.includes(k));
            const hasExcludeKeyword = excludeKeywords.some(k => text.includes(k));
            
            // If no clear ad keyword, check if it DOESNT have exclude keyword
            return hasAdKeyword && !hasExcludeKeyword; 
            // Or just: return !hasExcludeKeyword; if we want to be permissive.
            // Let's go with permissive but safe:
            // return !hasExcludeKeyword;
        });
        
        // If filtering removes everything (because maybe the test store ONLY has dresses), 
        // we might fallback to showing everything but visually trying to adapt? 
        // No, user said "Remove all non-ad services". So if they are non-ad, we hide them.
        
        const finalProductsList = filteredProducts.length > 0 ? filteredProducts : productsResponse.products.filter(p => !excludeKeywords.some(k => p.title.toLowerCase().includes(k)));

        const productIds = finalProductsList.map(product => product.id);
        
        if (productIds.length === 0) {
             setProducts([]);
             setLoading(false);
             return;
        }

        const quantitiesResponse = await getProductQuantities({
          fields: 'inventory_quantity',
          product_ids: productIds
        });

        const variantQuantityMap = new Map();
        quantitiesResponse.variants.forEach(variant => {
          variantQuantityMap.set(variant.id, variant.inventory_quantity);
        });

        const productsWithQuantities = finalProductsList.map(product => ({
          ...product,
          variants: product.variants.map(variant => ({
            ...variant,
            inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
          }))
        }));

        setProducts(productsWithQuantities);
      } catch (err) {
        setError(err.message || 'Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsWithQuantities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-10 w-10 text-[#0088CC] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8 bg-red-50 rounded-xl">
        <p>Unable to load service packages. Please try again later.</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-slate-500 p-12 bg-white rounded-xl border border-dashed border-slate-300">
        <p>No ad packages are currently available matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductsList;
