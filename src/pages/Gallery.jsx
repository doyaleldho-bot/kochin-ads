
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, X, ZoomIn, Calendar, Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Gallery = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [filterType, setFilterType] = useState('All');

  // Complete list of 14 Kerala Districts for Gallery
  const districts = [
    { id: 'tvm', name: 'Thiruvananthapuram', image: 'https://images.unsplash.com/photo-1627894483216-2138afdb3c6d?auto=format&fit=crop&q=80&w=400', count: 12 },
    { id: 'klm', name: 'Kollam', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=400', count: 8 },
    { id: 'ptm', name: 'Pathanamthitta', image: 'https://images.unsplash.com/photo-1629215865231-158229853810?auto=format&fit=crop&q=80&w=400', count: 5 },
    { id: 'alp', name: 'Alappuzha', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=400', count: 15 },
    { id: 'ktm', name: 'Kottayam', image: 'https://images.unsplash.com/photo-1628084606622-482833072522?auto=format&fit=crop&q=80&w=400', count: 9 },
    { id: 'idk', name: 'Idukki', image: 'https://images.unsplash.com/photo-1593693396885-5a5a0c3d6802?auto=format&fit=crop&q=80&w=400', count: 10 },
    { id: 'ekm', name: 'Ernakulam', image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=400', count: 24 },
    { id: 'tcr', name: 'Thrissur', image: 'https://images.unsplash.com/photo-1626014902194-0a35414876b6?auto=format&fit=crop&q=80&w=400', count: 14 },
    { id: 'pkd', name: 'Palakkad', image: 'https://images.unsplash.com/photo-1605626245353-0665d9539266?auto=format&fit=crop&q=80&w=400', count: 7 },
    { id: 'mlp', name: 'Malappuram', image: 'https://images.unsplash.com/photo-1621683935272-358b5a043c72?auto=format&fit=crop&q=80&w=400', count: 11 },
    { id: 'koz', name: 'Kozhikode', image: 'https://images.unsplash.com/photo-1610136896280-97434c44917a?auto=format&fit=crop&q=80&w=400', count: 18 },
    { id: 'way', name: 'Wayanad', image: 'https://images.unsplash.com/photo-1517234390509-3224b7875953?auto=format&fit=crop&q=80&w=400', count: 13 },
    { id: 'knr', name: 'Kannur', image: 'https://images.unsplash.com/photo-1590422749833-25c345b8542c?auto=format&fit=crop&q=80&w=400', count: 9 },
    { id: 'ksd', name: 'Kasaragod', image: 'https://images.unsplash.com/photo-1629215865231-158229853810?auto=format&fit=crop&q=80&w=400', count: 6 },
  ];

  // Mock gallery images logic
  const getGalleryImages = (districtId) => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      url: `https://source.unsplash.com/random/800x600?kerala,${districtId},${i}`,
      title: `${districtId.toUpperCase()} Campaign ${i+1}`,
      type: i % 2 === 0 ? 'Outdoor' : 'Digital',
      date: '2023-11-15'
    }));
  };

  const activeGallery = selectedDistrict ? getGalleryImages(selectedDistrict.id) : [];

  return (
    <>
      <Helmet>
        <title>Portfolio Gallery - Kochin Ads</title>
        <meta name="description" content="Explore our advertising campaigns across all 14 districts of Kerala." />
      </Helmet>

      <div className="pt-20 min-h-screen bg-slate-50">
        
        {/* Header */}
        <div className="bg-[#0D5A7A] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Work Across Kerala</h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              A visual journey through our impactful campaigns spanning every district of God's Own Country.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Breadcrumb / Back Navigation */}
          {selectedDistrict && (
            <div className="mb-6 flex items-center justify-between">
                <Button variant="ghost" onClick={() => setSelectedDistrict(null)} className="text-slate-600 hover:text-[#0D5A7A]">
                    ← Back to Districts
                </Button>
                <h2 className="text-2xl font-bold text-[#0D5A7A]">{selectedDistrict.name} Gallery</h2>
                <div className="w-24"></div> {/* Spacer */}
            </div>
          )}

          {/* District Grid View */}
          {!selectedDistrict && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {districts.map((d) => (
                <motion.div
                  key={d.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedDistrict(d)}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer group"
                >
                  <div className="h-40 overflow-hidden relative">
                     <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                  </div>
                  <div className="p-4 text-center">
                     <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto -mt-9 relative z-10 border-4 border-white">
                        <MapPin className="w-5 h-5 text-[#FF9500]" />
                     </div>
                     <h3 className="font-bold text-slate-800 mt-2">{d.name}</h3>
                     <p className="text-xs text-slate-500">{d.count} Campaigns</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* District Specific Gallery View */}
          {selectedDistrict && (
            <div>
               {/* Filters */}
               <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                  {['All', 'Outdoor', 'Digital', 'Print', 'Event'].map(type => (
                      <button
                         key={type}
                         onClick={() => setFilterType(type)}
                         className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${filterType === type ? 'bg-[#FF9500] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                      >
                          {type}
                      </button>
                  ))}
               </div>

               <div className="grid md:grid-cols-3 gap-6">
                  {activeGallery.map((img) => (
                      <motion.div 
                        key={img.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-lg shadow-sm overflow-hidden group cursor-zoom-in"
                        onClick={() => setLightboxImage(img)}
                      >
                         <div className="h-64 overflow-hidden relative">
                             <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                 <ZoomIn className="w-8 h-8 text-white" />
                             </div>
                         </div>
                         <div className="p-4">
                             <h4 className="font-bold text-slate-800">{img.title}</h4>
                             <div className="flex justify-between text-xs text-slate-500 mt-2">
                                 <span className="flex items-center gap-1"><ImageIcon className="w-3 h-3" /> {img.type}</span>
                                 <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {img.date}</span>
                             </div>
                         </div>
                      </motion.div>
                  ))}
               </div>
            </div>
          )}

        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
            {lightboxImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <button className="absolute top-4 right-4 text-white hover:text-slate-300">
                        <X className="w-8 h-8" />
                    </button>
                    <div className="max-w-4xl w-full max-h-[90vh]" onClick={e => e.stopPropagation()}>
                        <img src={lightboxImage.url} alt={lightboxImage.title} className="w-full h-full object-contain rounded-lg shadow-2xl" />
                        <div className="mt-4 text-center text-white">
                            <h3 className="text-xl font-bold">{lightboxImage.title}</h3>
                            <p className="text-slate-400">{lightboxImage.type} • {lightboxImage.date}</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default Gallery;
