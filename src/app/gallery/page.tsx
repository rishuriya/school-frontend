'use client';

import React, { useState, useMemo } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { galleryApi } from '../../services/api';
import { Gallery } from '../../types/school';

type SortOption = 'newest' | 'oldest' | 'title';

export default function GalleryPage() {
  const [galleries, setGalleries] = React.useState<Gallery[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const galleriesData = await galleryApi.getGalleries();
        console.log('Fetched galleries:', galleriesData);
        setGalleries(galleriesData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Extract unique categories from galleries
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(galleries.map(g => g.category).filter(Boolean))
    );
    return [
      { id: 'all', name: 'All Albums', count: galleries.length },
      ...uniqueCategories.map(cat => ({
        id: cat,
        name: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' '),
        count: galleries.filter(g => g.category === cat).length
      }))
    ];
  }, [galleries]);

  // Filter and sort galleries
  const filteredAndSortedGalleries = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? galleries 
      : galleries.filter(gallery => gallery.category === selectedCategory);

    // Sort galleries
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        case 'oldest':
          const dateAOld = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateBOld = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateAOld - dateBOld;
        case 'title':
          return (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [galleries, selectedCategory, sortBy]);

  // Get preview images for a gallery (up to 4 images)
  const getPreviewImages = (gallery: Gallery) => {
    if (!gallery.media || gallery.media.length === 0) return [];
    const images = gallery.media.filter(m => m.type === 'image').slice(0, 4);
    return images.map(img => img.url);
  };

  // Get featured image
  const getFeaturedImage = (gallery: Gallery) => {
    if (!gallery.media || gallery.media.length === 0) return null;
    const firstImage = gallery.media.find(m => m.type === 'image');
    return firstImage ? firstImage.url : gallery.media[0]?.url || null;
  };

  const openGalleryModal = (gallery: Gallery) => {
    setSelectedGallery(gallery);
    setIsModalOpen(true);
  };

  const closeGalleryModal = () => {
    setSelectedGallery(null);
    setIsModalOpen(false);
    setImageViewerOpen(false);
  };

  const openImageViewer = (gallery: Gallery, imageIndex: number) => {
    setSelectedGallery(gallery);
    setCurrentImageIndex(imageIndex);
    setImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setImageViewerOpen(false);
  };

  const nextImage = () => {
    if (!selectedGallery || !selectedGallery.media) return;
    const images = selectedGallery.media.filter(m => m.type === 'image');
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    if (!selectedGallery || !selectedGallery.media) return;
    const images = selectedGallery.media.filter(m => m.type === 'image');
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  React.useEffect(() => {
    if (!imageViewerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextImage();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeImageViewer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageViewerOpen]);

  // Prevent right-click and context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleImageError = (url: string) => {
    setImageErrors(prev => new Set(prev).add(url));
  };

  const isImageError = (url: string) => {
    return imageErrors.has(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading galleries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Photos
              </h1>
              <p className="text-gray-600">
                {filteredAndSortedGalleries.length} {filteredAndSortedGalleries.length === 1 ? 'album' : 'albums'}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-gray-100 border-0 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title A-Z</option>
                </select>
                <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                {category.count > 0 && (
                  <span className={`ml-2 ${selectedCategory === category.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    ({category.count})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAndSortedGalleries.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredAndSortedGalleries.map((gallery) => {
                  const previewImages = getPreviewImages(gallery);
                  const featuredImage = getFeaturedImage(gallery);
                  const mediaCount = gallery.mediaCount || gallery.media?.length || 0;

                  return (
                    <div
                      key={gallery._id || gallery.id}
                      onClick={() => openGalleryModal(gallery)}
                      className="group cursor-pointer"
                    >
                      {/* Album Cover */}
                      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                        {previewImages.length >= 4 ? (
                          // Show 4-image grid preview
                          <div className="grid grid-cols-2 h-full gap-0.5">
                            {previewImages.slice(0, 4).map((img, idx) => (
                              <div key={idx} className="relative overflow-hidden">
                                {isImageError(img) ? (
                                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                ) : (
                                  <img
                                    src={img}
                                    alt={`${gallery.title} preview ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    onError={() => handleImageError(img)}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        ) : previewImages.length > 0 ? (
                          // Show single or multiple images
                          <div className="relative w-full h-full">
                            {isImageError(previewImages[0]) ? (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            ) : (
                              <img
                                src={previewImages[0]}
                                alt={gallery.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={() => handleImageError(previewImages[0])}
                              />
                            )}
                            {previewImages.length > 1 && (
                              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                                +{previewImages.length - 1}
                              </div>
                            )}
                          </div>
                        ) : featuredImage ? (
                          // Fallback to featured image
                          <div className="relative w-full h-full">
                            {isImageError(featuredImage) ? (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            ) : (
                              <img
                                src={featuredImage}
                                alt={gallery.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={() => handleImageError(featuredImage)}
                              />
                            )}
                          </div>
                        ) : (
                          // Placeholder
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-gray-900">
                              View Album
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Album Info */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {gallery.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {mediaCount} {mediaCount === 1 ? 'photo' : 'photos'}
                        </p>
                        {gallery.createdAt && (
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(gallery.createdAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {filteredAndSortedGalleries.map((gallery) => {
                  const featuredImage = getFeaturedImage(gallery);
                  const mediaCount = gallery.mediaCount || gallery.media?.length || 0;

                  return (
                    <div
                      key={gallery._id || gallery.id}
                      onClick={() => openGalleryModal(gallery)}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {featuredImage ? (
                          isImageError(featuredImage) ? (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          ) : (
                            <img
                              src={featuredImage}
                              alt={gallery.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={() => handleImageError(featuredImage)}
                            />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {gallery.title}
                        </h3>
                        {gallery.description && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {gallery.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{mediaCount} {mediaCount === 1 ? 'photo' : 'photos'}</span>
                          {gallery.category && (
                            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                              {gallery.category}
                            </span>
                          )}
                          {gallery.createdAt && (
                            <span>{formatDate(gallery.createdAt)}</span>
                          )}
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Albums Found</h3>
              <p className="text-gray-600">Try selecting a different category or check back later for new albums.</p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Modal - Full Screen View */}
      {isModalOpen && selectedGallery && (
        <div 
          className="fixed inset-0 bg-black z-50 flex flex-col"
          onClick={closeGalleryModal}
        >
          {/* Modal Header */}
          <div 
            className="bg-black/80 backdrop-blur-sm text-white p-4 flex items-center justify-between z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h2 className="text-xl font-bold">{selectedGallery.title}</h2>
              {selectedGallery.description && (
                <p className="text-sm text-gray-300 mt-1">{selectedGallery.description}</p>
              )}
            </div>
            <button
              onClick={closeGalleryModal}
              className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Modal Content - Masonry Grid */}
          <div 
            className="flex-1 overflow-y-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedGallery.media && selectedGallery.media.length > 0 ? (
              <div className="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {selectedGallery.media.map((media, index) => {
                  // Find the image index (only counting images, not videos)
                  const imageIndex = selectedGallery.media
                    .slice(0, index + 1)
                    .filter(m => m.type === 'image').length - 1;

                  return (
                    <div key={index} className="break-inside-avoid mb-4 group">
                      {media.type === 'image' ? (
                        <div 
                          className="relative rounded-lg overflow-hidden bg-gray-900 cursor-pointer"
                          onClick={() => openImageViewer(selectedGallery, imageIndex)}
                        >
                          {isImageError(media.url) ? (
                            <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          ) : (
                            <img
                              src={media.url}
                              alt={media.caption || `${selectedGallery.title} - Image ${index + 1}`}
                              className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity"
                              onError={() => handleImageError(media.url)}
                              loading="lazy"
                              onContextMenu={handleContextMenu}
                              onDragStart={handleDragStart}
                            />
                          )}
                          {media.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                              <p className="text-white text-sm">{media.caption}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                      <div className="relative rounded-lg overflow-hidden bg-gray-900">
                        <video
                          src={media.url}
                          controls
                          className="w-full h-auto"
                          onContextMenu={handleContextMenu}
                        />
                        {media.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <p className="text-white text-sm">{media.caption}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 text-white">
                <p>No media items in this album.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full Screen Image Viewer */}
      {imageViewerOpen && selectedGallery && (() => {
        const images = selectedGallery.media.filter(m => m.type === 'image');
        const currentImage = images[currentImageIndex];
        
        if (!currentImage) return null;

        return (
          <div 
            className="fixed inset-0 bg-black z-[60] flex items-center justify-center select-none"
            onClick={closeImageViewer}
            onContextMenu={handleContextMenu}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' } as React.CSSProperties}
          >
            {/* Close Button */}
            <button
              onClick={closeImageViewer}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 p-2 rounded-full hover:bg-white/10"
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  previousImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-4 rounded-full hover:bg-white/10 backdrop-blur-sm"
                aria-label="Previous image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-4 rounded-full hover:bg-white/10 backdrop-blur-sm"
                aria-label="Next image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image Container */}
            <div 
              className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
              onContextMenu={handleContextMenu}
            >
              {isImageError(currentImage.url) ? (
                <div className="w-full h-96 bg-gray-800 flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              ) : (
                <img
                  src={currentImage.url}
                  alt={currentImage.caption || `${selectedGallery.title} - Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[90vh] object-contain select-none"
                  style={{ 
                    userSelect: 'none', 
                    WebkitUserSelect: 'none', 
                    WebkitUserDrag: 'none',
                    pointerEvents: 'auto'
                  } as React.CSSProperties}
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  draggable={false}
                />
              )}

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <div className="max-w-4xl mx-auto">
                  {currentImage.caption && (
                    <p className="text-lg mb-2">{currentImage.caption}</p>
                  )}
                  <p className="text-sm text-gray-300">
                    {currentImageIndex + 1} of {images.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        );
      })()}

      <Footer />
    </div>
  );
}
