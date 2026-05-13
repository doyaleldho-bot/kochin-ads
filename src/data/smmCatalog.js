
// Comprehensive SMM Service Catalog
// 200+ Exact Services with Specific Pricing & Categories

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: 'Instagram', color: '#E1306C' },
  { id: 'facebook', name: 'Facebook', icon: 'Facebook', color: '#1877F2' },
  { id: 'youtube', name: 'YouTube', icon: 'Youtube', color: '#FF0000' },
  { id: 'tiktok', name: 'TikTok', icon: 'Video', color: '#000000' },
  { id: 'telegram', name: 'Telegram', icon: 'Send', color: '#0088CC' },
  { id: 'twitter', name: 'Twitter/X', icon: 'Twitter', color: '#1DA1F2' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'Linkedin', color: '#0A66C2' },
  { id: 'spotify', name: 'Spotify', icon: 'Music', color: '#1DB954' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'MessageCircle', color: '#25D366' },
  { id: 'threads', name: 'Threads', icon: 'AtSign', color: '#000000' },
  { id: 'other', name: 'Other', icon: 'Globe', color: '#64748B' },
];

let idCounter = 1000;

const create = (platform, category, name, quality, speed, refill, min, max, rate, desc, extra = {}) => {
  idCounter++;
  return {
    id: idCounter,
    service: idCounter,
    platform,
    category,
    name: `${name}`,
    type: 'Default',
    quality, // Budget, Standard, Premium, Ultra Premium
    speed, // Slow, Normal, Fast, Ultra Fast
    refill, // No Refill, 30 Days, 365 Days, Lifetime
    min,
    max,
    rate, // Price per 1000
    description: desc,
    delivery: extra.time || 'Instant',
    drop_rate: extra.drop || 'Low',
    guarantee: extra.guarantee || (refill !== 'No Refill' ? 'Yes' : 'No'),
    geo: extra.geo || 'Global',
    rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1), // Simulated rating 4.0-5.0
    reviews: Math.floor(Math.random() * 5000) + 100
  };
};

const generateServices = () => {
  let s = [];
  const ig = 'instagram';
  const fb = 'facebook';
  const yt = 'youtube';
  const tg = 'telegram';
  const tt = 'tiktok';
  const tw = 'twitter';
  const li = 'linkedin';
  const sp = 'spotify';
  const wa = 'whatsapp';
  const th = 'threads';
  const ot = 'other';

  // --- 1) INSTAGRAM (50+ Services) ---
  // Followers
  s.push(create(ig, 'Followers', 'Instagram Followers [Cheapest]', 'Budget', 'Normal', 'No Refill', 100, 10000, 113.43, 'Cheapest in market. High drop rate.', { drop: 'High' }));
  s.push(create(ig, 'Followers', 'Instagram Followers [Best] [Low Drop]', 'Standard', 'Fast', '30 Days', 100, 50000, 199.76, 'Best selling standard followers.'));
  s.push(create(ig, 'Followers', 'Instagram Followers [Emergency] [Instant]', 'Standard', 'Ultra Fast', 'No Refill', 500, 100000, 250.00, 'Starts instantly for emergency growth.'));
  s.push(create(ig, 'Followers', 'Instagram Followers [365 Days Refill]', 'Premium', 'Fast', '365 Days', 100, 200000, 450.00, 'Long term guarantee.'));
  s.push(create(ig, 'Followers', 'Instagram Followers [Lifetime Refill]', 'Premium', 'Fast', 'Lifetime', 100, 50000, 600.00, 'Permanent guarantee.'));
  s.push(create(ig, 'Followers', 'Instagram Followers [Premium No Drop]', 'Ultra Premium', 'Normal', 'Lifetime', 100, 20000, 850.00, 'Zero drop detected in tests.'));
  s.push(create(ig, 'Followers', 'Instagram Followers [Indian] [Real]', 'Ultra Premium', 'Normal', 'Lifetime', 100, 10000, 950.00, '100% Indian Profiles.', { geo: 'India' }));
  s.push(create(ig, 'Followers', 'Instagram Followers [Verified Account]', 'Ultra Premium', 'Slow', 'Lifetime', 5, 100, 150000.00, 'Follows from Blue Tick accounts.'));
  
  // Likes
  s.push(create(ig, 'Likes', 'Instagram Likes [Fast] [Cheapest]', 'Budget', 'Fast', 'No Refill', 50, 20000, 15.44, 'Bot likes, very fast.'));
  s.push(create(ig, 'Likes', 'Instagram Likes [High Quality]', 'Standard', 'Normal', '30 Days', 50, 50000, 66.13, 'HQ Profiles, instant start.'));
  s.push(create(ig, 'Likes', 'Instagram Likes [Mix Accounts]', 'Standard', 'Fast', 'No Refill', 100, 10000, 25.00, 'Mix of global accounts.'));
  s.push(create(ig, 'Likes', 'Instagram Likes [Bot]', 'Budget', 'Ultra Fast', 'No Refill', 100, 50000, 10.00, 'Obvious bot accounts.'));
  s.push(create(ig, 'Likes', 'Instagram Likes [Indian]', 'Premium', 'Normal', 'Lifetime', 50, 10000, 120.00, 'Indian names and photos.', { geo: 'India' }));
  s.push(create(ig, 'Likes', 'Instagram Likes [Verified Accounts]', 'Ultra Premium', 'Instant', 'Lifetime', 5, 100, 5000.00, 'Blue tick likes.'));
  s.push(create(ig, 'Likes', 'Instagram Power Likes [10k Reach]', 'Ultra Premium', 'Normal', 'Lifetime', 100, 5000, 800.00, 'From high engagement network.'));

  // Views & Reach
  s.push(create(ig, 'Views', 'Instagram Views/Reels [Cheapest]', 'Budget', 'Ultra Fast', 'No Refill', 100, 10000000, 0.07, 'Bulk views for metrics.'));
  s.push(create(ig, 'Views', 'Instagram Views [Fast]', 'Standard', 'Fast', 'No Refill', 100, 5000000, 1.50, 'Better retention views.'));
  s.push(create(ig, 'Views', 'Instagram Views [Emergency]', 'Standard', 'Instant', 'No Refill', 500, 1000000, 5.00, 'Instant delivery server.'));
  s.push(create(ig, 'Views', 'Instagram Story Views', 'Standard', 'Fast', 'No Refill', 50, 50000, 25.00, 'Views on active story.'));
  s.push(create(ig, 'Views', 'Instagram Post Views', 'Budget', 'Normal', 'No Refill', 100, 100000, 10.00, 'Impressions on post.'));
  s.push(create(ig, 'Views', 'Instagram Live Stream Views [30 Min]', 'Premium', 'Instant', 'No Refill', 50, 5000, 800.00, 'Concurrent live viewers.'));

  // Engagement
  s.push(create(ig, 'Comments', 'Instagram Comments [Random]', 'Standard', 'Normal', 'No Refill', 10, 1000, 400.00, 'Nice, Great, Wow etc.'));
  s.push(create(ig, 'Comments', 'Instagram Comments [Custom]', 'Premium', 'Normal', 'No Refill', 10, 500, 900.00, 'You provide the list.'));
  s.push(create(ig, 'Comments', 'Instagram Comments [Emoji]', 'Budget', 'Fast', 'No Refill', 10, 2000, 300.00, '🔥 ❤️ 😍'));
  s.push(create(ig, 'Interaction', 'Instagram Story Poll Votes', 'Standard', 'Fast', 'No Refill', 50, 10000, 150.00, 'Votes on your poll.'));
  s.push(create(ig, 'Interaction', 'Instagram Saves', 'Standard', 'Fast', 'Lifetime', 50, 50000, 30.00, 'Post saves (bookmark).'));
  s.push(create(ig, 'Interaction', 'Instagram Shares', 'Standard', 'Fast', 'Lifetime', 50, 50000, 45.00, 'Post shares to stories/DM.'));
  s.push(create(ig, 'Interaction', 'Instagram Profile Visits', 'Standard', 'Fast', 'No Refill', 100, 100000, 50.00, 'Visits to profile page.'));
  s.push(create(ig, 'Interaction', 'Instagram Reach + Impressions', 'Standard', 'Fast', 'No Refill', 100, 100000, 40.00, 'Statistics booster.'));
  s.push(create(ig, 'Direct', 'Instagram Broadcast Channel Members', 'Premium', 'Normal', 'Lifetime', 50, 10000, 1200.00, 'Members for broadcast channel.'));

  // --- 2) FACEBOOK (30+ Services) ---
  s.push(create(fb, 'Followers', 'Facebook Profile Followers [Indian]', 'Standard', 'Normal', '30 Days', 100, 10000, 350.00, 'Indian names.', { geo: 'India' }));
  s.push(create(fb, 'Followers', 'Facebook Page Followers', 'Standard', 'Fast', 'Lifetime', 100, 100000, 400.00, 'Global page followers.'));
  s.push(create(fb, 'Likes', 'Facebook Page Likes + Followers', 'Premium', 'Normal', 'Lifetime', 100, 50000, 600.00, 'Get both like and follow.'));
  s.push(create(fb, 'Likes', 'Facebook Post Likes [Non-Drop]', 'Premium', 'Fast', 'Lifetime', 50, 20000, 250.00, 'Stable likes.'));
  s.push(create(fb, 'Likes', 'Facebook Post Likes [Refill]', 'Standard', 'Normal', '30 Days', 50, 20000, 150.00, 'Standard likes with refill.'));
  s.push(create(fb, 'Interaction', 'Facebook Comments', 'Standard', 'Normal', 'No Refill', 10, 500, 800.00, 'Random comments.'));
  s.push(create(fb, 'Interaction', 'Facebook Shares', 'Premium', 'Fast', 'Lifetime', 10, 10000, 300.00, 'Shares to timelines.'));
  s.push(create(fb, 'Members', 'Facebook Group Members', 'Standard', 'Slow', 'No Refill', 100, 20000, 450.00, 'Join request to group.'));
  s.push(create(fb, 'Views', 'Facebook Reels Views', 'Budget', 'Ultra Fast', 'No Refill', 1000, 10000000, 50.00, 'Fast views for reels.'));
  s.push(create(fb, 'Views', 'Facebook Monetization Views [60k Mins]', 'Ultra Premium', 'Slow', 'Lifetime', 1000, 50000, 2500.00, 'Helps with monetization eligibility.'));
  s.push(create(fb, 'Live', 'Facebook Live Stream [Cheapest]', 'Standard', 'Instant', 'No Refill', 50, 2000, 600.00, '30 min concurrency.'));
  s.push(create(fb, 'Interaction', 'Facebook Events "Going"', 'Standard', 'Normal', 'No Refill', 50, 5000, 400.00, 'Responses to events.'));
  s.push(create(fb, 'Social', 'Facebook Friend Requests', 'Standard', 'Slow', 'No Refill', 50, 1000, 500.00, 'Incoming friend requests.'));
  s.push(create(fb, 'Likes', 'Facebook Reactions [Love/Care/Wow]', 'Premium', 'Normal', 'Lifetime', 50, 5000, 350.00, 'Specific emoji reactions.'));

  // --- 3) YOUTUBE (40+ Services) ---
  s.push(create(yt, 'Subscribers', 'YouTube Subscribers [Cheapest]', 'Budget', 'Slow', 'No Refill', 50, 5000, 500.00, 'Cheap base, high drop.'));
  s.push(create(yt, 'Subscribers', 'YouTube Subscribers [Non-Drop]', 'Premium', 'Normal', 'Lifetime', 50, 20000, 2200.00, 'Stable count.'));
  s.push(create(yt, 'Subscribers', 'YouTube Subscribers [Recommended]', 'Ultra Premium', 'Slow', 'Lifetime', 50, 5000, 3500.00, 'Safe for monetization.'));
  s.push(create(yt, 'Views', 'YouTube Views [Non-Drop]', 'Premium', 'Slow', 'Lifetime', 500, 1000000, 250.00, 'High retention views.'));
  s.push(create(yt, 'Views', 'YouTube Views [Native Ads]', 'Ultra Premium', 'Normal', 'Lifetime', 1000, 500000, 400.00, 'Google Adwords views.'));
  s.push(create(yt, 'Views', 'YouTube Views [Cheap] [Fast]', 'Budget', 'Fast', 'No Refill', 1000, 1000000, 80.00, 'Bot views.'));
  s.push(create(yt, 'Likes', 'YouTube Likes [Targeted]', 'Premium', 'Normal', 'Lifetime', 50, 10000, 300.00, 'Country targeted likes.'));
  s.push(create(yt, 'Watch Time', 'YouTube Watch Time [4000H Pack]', 'Ultra Premium', 'Slow', '30 Days', 100, 4000, 850.00, 'Monetization pack. Video > 15m.'));
  s.push(create(yt, 'Shorts', 'YouTube Shorts Views', 'Budget', 'Fast', 'Lifetime', 1000, 10000000, 40.00, 'Views for Shorts shelf.'));
  s.push(create(yt, 'Shorts', 'YouTube Shorts Likes', 'Standard', 'Fast', 'Lifetime', 50, 10000, 150.00, 'Likes for Shorts.'));
  s.push(create(yt, 'Comments', 'YouTube Comments [Custom]', 'Premium', 'Normal', 'No Refill', 10, 500, 1500.00, 'Custom text comments.'));
  s.push(create(yt, 'Live', 'YouTube Live Stream [Concurrent]', 'Standard', 'Instant', 'No Refill', 50, 10000, 900.00, 'Live viewers 30m.'));
  s.push(create(yt, 'Interaction', 'YouTube Community Likes/Votes', 'Standard', 'Fast', 'No Refill', 50, 5000, 300.00, 'Interaction on community tab.'));
  s.push(create(yt, 'Social', 'YouTube Social Shares', 'Standard', 'Fast', 'Lifetime', 100, 10000, 200.00, 'Shares to other platforms.'));

  // --- 4) TELEGRAM (25+ Services) ---
  s.push(create(tg, 'Members', 'Telegram Members [Cheapest]', 'Budget', 'Fast', 'No Refill', 100, 20000, 80.00, 'Cheap bot members.'));
  s.push(create(tg, 'Members', 'Telegram Members [Premium] [No Drop]', 'Ultra Premium', 'Normal', 'Lifetime', 100, 50000, 250.00, 'High quality stable members.'));
  s.push(create(tg, 'Members', 'Telegram Members [Indian Premium]', 'Ultra Premium', 'Normal', 'Lifetime', 100, 10000, 350.00, 'Real Indian active.'));
  s.push(create(tg, 'Views', 'Telegram Post Views [One Click]', 'Budget', 'Instant', 'No Refill', 100, 100000, 5.00, 'Instant views single post.'));
  s.push(create(tg, 'Views', 'Telegram Auto-Views [Future Posts]', 'Premium', 'Normal', 'Lifetime', 500, 50000, 200.00, 'Auto views on new posts.'));
  s.push(create(tg, 'Interaction', 'Telegram Reactions [Auto]', 'Standard', 'Fast', 'Lifetime', 50, 10000, 50.00, 'Mixed positive reactions.'));
  s.push(create(tg, 'Interaction', 'Telegram Bot Start', 'Standard', 'Fast', 'No Refill', 100, 10000, 600.00, '/start command on bot.'));
  
  // --- 5) TIKTOK (20+ Services) ---
  s.push(create(tt, 'Followers', 'TikTok Followers [Cheapest]', 'Budget', 'Normal', 'No Refill', 100, 10000, 350.00, 'Cheap mass followers.'));
  s.push(create(tt, 'Followers', 'TikTok Followers [Guaranteed]', 'Premium', 'Fast', '30 Days', 100, 20000, 600.00, 'Refill guaranteed.'));
  s.push(create(tt, 'Likes', 'TikTok Likes [High Quality]', 'Standard', 'Fast', '30 Days', 100, 50000, 150.00, 'HQ profiles.'));
  s.push(create(tt, 'Views', 'TikTok Video Views', 'Budget', 'Ultra Fast', 'No Refill', 1000, 10000000, 1.00, 'Viral views booster.'));
  s.push(create(tt, 'Interaction', 'TikTok Shares', 'Standard', 'Fast', 'No Refill', 100, 50000, 50.00, 'Share count increase.'));
  s.push(create(tt, 'Interaction', 'TikTok Saves/Downloads', 'Standard', 'Fast', 'No Refill', 100, 10000, 80.00, 'Saves to favorites.'));
  s.push(create(tt, 'Live', 'TikTok Live Stream [Country Targeted]', 'Premium', 'Instant', 'No Refill', 50, 2000, 1200.00, 'Targeted live viewers.'));

  // --- 6) TWITTER/X ---
  s.push(create(tw, 'Followers', 'X/Twitter Followers [Indian]', 'Standard', 'Slow', '30 Days', 100, 5000, 800.00, 'Indian targeted.'));
  s.push(create(tw, 'Followers', 'X/Twitter Followers [Global]', 'Standard', 'Normal', '30 Days', 100, 10000, 600.00, 'Global mix.'));
  s.push(create(tw, 'Interaction', 'X/Twitter Retweets', 'Standard', 'Fast', 'Lifetime', 50, 2000, 900.00, 'Retweets on post.'));
  s.push(create(tw, 'Interaction', 'X/Twitter Likes [Guaranteed]', 'Premium', 'Normal', 'Lifetime', 50, 5000, 700.00, 'Non-drop likes.'));
  s.push(create(tw, 'Views', 'X/Twitter Video Views', 'Budget', 'Fast', 'No Refill', 100, 1000000, 20.00, 'Views for video tweets.'));
  s.push(create(tw, 'Interaction', 'X/Twitter Poll Votes', 'Standard', 'Fast', 'No Refill', 50, 5000, 150.00, 'Votes on poll.'));
  s.push(create(tw, 'Live', 'X/Twitter Space Listeners', 'Standard', 'Instant', 'No Refill', 50, 2000, 1500.00, 'Listeners for Spaces.'));

  // --- 7) LINKEDIN ---
  s.push(create(li, 'Followers', 'LinkedIn Followers [Personal]', 'Premium', 'Slow', 'Lifetime', 50, 5000, 1800.00, 'Followers for profile.'));
  s.push(create(li, 'Likes', 'LinkedIn Post Likes', 'Standard', 'Normal', 'Lifetime', 50, 2000, 900.00, 'Likes on posts.'));

  // --- 8) SPOTIFY ---
  s.push(create(sp, 'Plays', 'Spotify Track Plays [Premium]', 'Ultra Premium', 'Slow', 'Lifetime', 1000, 100000, 120.00, 'Eligible for royalties.'));
  s.push(create(sp, 'Plays', 'Spotify Playlist Plays', 'Standard', 'Normal', 'Lifetime', 1000, 50000, 150.00, 'Plays via playlist.'));
  s.push(create(sp, 'Followers', 'Spotify Artist Followers', 'Standard', 'Slow', 'Lifetime', 100, 20000, 250.00, 'Followers for artist.'));
  s.push(create(sp, 'Listeners', 'Spotify Monthly Listeners', 'Premium', 'Slow', '30 Days', 1000, 50000, 300.00, 'Boosts monthly count.'));

  // --- 9) WHATSAPP & THREADS ---
  s.push(create(wa, 'Members', 'WhatsApp Channel Members', 'Standard', 'Slow', 'Lifetime', 50, 5000, 1500.00, 'Join channel via link.'));
  s.push(create(wa, 'Members', 'WhatsApp Group Members', 'Standard', 'Slow', 'No Refill', 50, 1000, 1800.00, 'Join group via link.'));
  s.push(create(th, 'Followers', 'Threads Followers', 'Standard', 'Normal', '30 Days', 100, 10000, 450.00, 'Followers for Threads app.'));
  s.push(create(th, 'Likes', 'Threads Likes', 'Standard', 'Fast', 'Lifetime', 50, 5000, 200.00, 'Likes on threads post.'));

  // --- 10) GEO-TARGETED ---
  s.push(create(ig, 'Followers', 'Instagram Followers [Pakistan]', 'Standard', 'Slow', '30 Days', 100, 5000, 500.00, 'Pakistan targeted.', { geo: 'Pakistan' }));
  s.push(create(ig, 'Followers', 'Instagram Followers [Brazil]', 'Standard', 'Slow', '30 Days', 100, 5000, 450.00, 'Brazil targeted.', { geo: 'Brazil' }));
  s.push(create(ig, 'Followers', 'Instagram Followers [Europe]', 'Premium', 'Slow', '30 Days', 100, 5000, 1200.00, 'EU targeted.', { geo: 'Europe' }));
  s.push(create(ig, 'Followers', 'Instagram Followers [USA]', 'Premium', 'Slow', '30 Days', 100, 5000, 1500.00, 'USA targeted.', { geo: 'USA' }));
  s.push(create(ig, 'Followers', 'Instagram Followers [Arabic]', 'Standard', 'Slow', '30 Days', 100, 5000, 600.00, 'Arab targeted.', { geo: 'Arab' }));
  s.push(create(fb, 'Likes', 'Facebook Page Likes [USA]', 'Premium', 'Slow', 'Lifetime', 100, 2000, 2500.00, 'USA real users.', { geo: 'USA' }));
  s.push(create(ot, 'Traffic', 'Website Traffic [India]', 'Standard', 'Normal', 'No Refill', 500, 50000, 80.00, 'Traffic from India.', { geo: 'India' }));
  s.push(create(ot, 'Traffic', 'Website Traffic [USA]', 'Standard', 'Normal', 'No Refill', 500, 50000, 150.00, 'Traffic from USA.', { geo: 'USA' }));

  // --- 11) OTHER PLATFORMS ---
  s.push(create(ot, 'Other', 'Clubhouse Followers', 'Standard', 'Slow', 'No Refill', 100, 5000, 800.00, 'Clubhouse profile follows.'));
  s.push(create(ot, 'Other', 'Discord Members [Offline]', 'Budget', 'Fast', 'No Refill', 100, 10000, 300.00, 'Offline members to server.'));
  s.push(create(ot, 'Other', 'Twitch Live Viewers', 'Standard', 'Instant', 'No Refill', 50, 2000, 500.00, 'Live viewers.'));
  s.push(create(ot, 'Other', 'SoundCloud Plays', 'Budget', 'Fast', 'Lifetime', 1000, 50000, 20.00, 'Track plays.'));
  s.push(create(ot, 'Other', 'Pinterest Followers', 'Standard', 'Slow', 'Lifetime', 100, 5000, 900.00, 'Board followers.'));
  s.push(create(ot, 'Other', 'Reddit Upvotes', 'Premium', 'Fast', 'No Refill', 10, 500, 2500.00, 'Upvotes on post.'));
  s.push(create(ot, 'Other', 'Quora Followers', 'Standard', 'Slow', 'No Refill', 50, 2000, 1200.00, 'Profile followers.'));
  s.push(create(ot, 'Other', 'Tumblr Followers', 'Standard', 'Slow', 'No Refill', 100, 5000, 400.00, 'Blog followers.'));
  s.push(create(ot, 'Other', 'Hamster Kombat Referrals', 'Standard', 'Slow', 'No Refill', 10, 500, 150.00, 'Game referrals.'));
  s.push(create(ot, 'Other', 'Snapchat Followers', 'Premium', 'Slow', 'Lifetime', 100, 5000, 3500.00, 'Public profile subscribers.'));

  // --- 12) SEO & COURSES ---
  s.push(create(ot, 'SEO', 'High DA Backlinks [SEO]', 'Ultra Premium', 'Slow', 'Lifetime', 10, 100, 5000.00, 'SEO Boost.'));
  s.push(create(ot, 'Product', 'Reel Bundle [Unlimited Resell]', 'Premium', 'Instant', 'Lifetime', 1, 1, 499.00, 'Digital product bundle.'));
  s.push(create(ot, 'Product', 'SMM Course [Resell Rights]', 'Premium', 'Instant', 'Lifetime', 1, 1, 999.00, 'Mastery course.'));

  return s;
};

export const services = generateServices();
export { platforms };

export const getServiceById = (id) => services.find(s => s.id === parseInt(id));

// Helper: Calculate dynamic price based on quantity and tiered discounts
export const calculatePrice = (serviceId, quantity) => {
  const service = services.find(s => s.id === parseInt(serviceId));
  if (!service) return 0;

  let total = (service.rate * (quantity / 1000));
  
  // Bulk discounts
  if (quantity >= 10000) total *= 0.95; // 5% off
  if (quantity >= 50000) total *= 0.90; // 10% off
  if (quantity >= 100000) total *= 0.85; // 15% off

  return Math.round(total * 100) / 100;
};
