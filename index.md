---
layout: "base.njk"
title: "Home"
---

<div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
    <h1 class="text-4xl font-black text-white mb-4 md:mb-0">All Songs</h1>
    
    <div class="filters flex flex-col sm:flex-row gap-4">
        <input 
            type="text" 
            id="searchInput" 
            placeholder="Search by title or singer..."
            class="w-full sm:w-64 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
        <select 
            id="langFilter"
            class="w-full sm:w-auto px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
            <option value="all">All Languages</option>
            <option value="Sinhala">Sinhala</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
            </select>
    </div>
</div>

<div id="songList" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {%- for post in collections.posts -%}
    <div class="song-item group" data-title="{{ post.data.title | lower }}" data-singer="{{ post.data.singer | lower }}" data-lang="{{ post.data.language | lower }}">
        <div class="song-card block bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-indigo-500/20 hover:scale-[1.02] h-full flex flex-col">
            
            <a href="{{ post.url | url }}" class="flex-shrink-0">
                <div class="image-container w-full aspect-square overflow-hidden"> {# ⭐️ PERFECT SQUARE CONTAINER ⭐️ #}
                    <img 
                        src="/posts/{{ post.data.cover_image | default('cover.jpg') }}"
                        alt="{{ post.data.title }} Album Art" 
                        class="w-full h-full object-cover"
                        onerror="this.src='/posts/cover.jpg'"
                    >
                    <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
                    </div>
                </div>
            </a>

            <div class="song-info p-4 flex-grow flex flex-col justify-center min-h-[80px]"> {# ⭐️ GUARANTEED TEXT SPACE ⭐️ #}
                <a href="{{ post.url | url }}">
                    <h3 class="text-lg font-bold text-white truncate group-hover:text-indigo-400 transition-colors mb-1">{{ post.data.title }}</h3>
                </a>
                <a href="/singers/{{ post.data.singer | slugify }}/" class="text-slate-400 truncate hover:text-indigo-400 hover:underline text-sm">
                    {{ post.data.singer }}
                </a>
            </div>
        </div>
    </div>
    {%- endfor -%}
</div>

<div id="noResults" class="hidden text-center py-16">
    <h2 class="text-2xl font-bold text-slate-500">No songs found.</h2>
    <p class="text-slate-600">Try adjusting your search or filter.</p>
</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('searchInput');
        const langFilter = document.getElementById('langFilter');
        const songList = document.getElementById('songList');
        const songItems = songList.querySelectorAll('.song-item');
        const noResults = document.getElementById('noResults');

        function filterSongs() {
            const searchTerm = searchInput.value.toLowerCase();
            const langTerm = langFilter.value.toLowerCase();
            let visibleCount = 0;

            songItems.forEach(item => {
                const title = item.dataset.title;
                const singer = item.dataset.singer;
                const lang = item.dataset.lang;

                const matchesSearch = title.includes(searchTerm) || singer.includes(searchTerm);
                const matchesLang = (langTerm === 'all') || lang === langTerm;

                if (matchesSearch && matchesLang) {
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }

        searchInput.addEventListener('keyup', filterSongs);
        langFilter.addEventListener('change', filterSongs);
    });
</script>