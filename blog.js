// Simple Markdown to HTML converter (very basic)
function markdownToHTML(md) {
    return md
      .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/^\-\s(.*?)$/gm, '<li>$1</li>')
      .replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }
  
  // Load and render post
  async function loadPost(name) {
    const res = await fetch(`posts/${name}.md`);
    if (!res.ok) return;
    const markdown = await res.text();
    const html = markdownToHTML(markdown);
    document.getElementById('blog-content').innerHTML = `
      <article class="post-article">
        ${html}
        <p><a href="#blog" class="back-link">← Back to Blog List</a></p>
      </article>
    `;
  }
  
  // Event delegation for blog post links
  document.querySelector('.blog-posts').addEventListener('click', (e) => {
    if (e.target.dataset.post) {
      e.preventDefault();
      loadPost(e.target.dataset.post);
    }
  });
  