###
# Blog settings
###

# Time.zone = "UTC"

activate :blog do |blog|
  blog.permalink = "{title}.html"
  blog.sources = "posts/{year}-{month}-{day}-{title}.html"
  blog.layout = "blog"
  blog.paginate = true
  blog.page_link = "p{num}"
  blog.per_page = 15
end

page "/feed.xml", layout: false

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
set :partials_dir, 'partials'

ignore 'stylesheets/src/*'
ignore 'stylesheets/config.js'

set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true, with_toc_data: true

activate :syntax, :line_numbers => false
activate :directory_indexes

password = ENV["BLOG_PASSWORD"]

activate :deploy do |deploy|
  deploy.method = :ftp
  deploy.host = 'simonsmith.io'
  deploy.path = '/public_html'
  deploy.user = 'blogftp@simonsmith.io'
  deploy.password = password
end

# Build-specific configuration
configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :asset_hash
end

helpers do
  def nav_active(url)
    'is-active' if current_page.url == url || current_page.data.type == 'post' && url == '/'
  end

  def markdown(text)
    Tilt['markdown'].new { text }.render
  end
end
