---
layout: base.njk
title: "Home"
---

<h1>Welcome to Echo Lyrics</h1>

<div class="filters">
    <input type="text" id="searchInput" placeholder="Search by title or singer...">
    <select id="langFilter">
        <option value="all">All Languages</option>
        <option value="Sinhala">Sinhala</option>
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
    </select>
</div>

<div id="songList">
    {%- for post in collections.posts -%}
    <div class="song-item" data-title="{{ post.data.title }}" data-singer="{{ post.data.singer }}" data-lang="{{ post.data.language }}">
        <a href="{{ post.url }}">
            <h3>{{ post.data.title }}</h3>
            <p>{{ post.data.singer }}</p>
        </a>
    </div>
    {%- endfor -%}
</div>