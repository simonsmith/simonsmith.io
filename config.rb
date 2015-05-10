###
# Blog settings
###

# Time.zone = "UTC"

activate :blog do |blog|
  blog.permalink = "{title}.html"
  blog.sources = "posts/{year}-{month}-{day}-{title}.html"
  blog.layout = "blog"
end

page "/feed.xml", layout: false

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
set :partials_dir, 'partials'

ignore 'stylesheets/src/*'

set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true, with_toc_data: true

activate :syntax, :line_numbers => false
activate :directory_indexes

file = File.open(".ftp_password", "r")
password = file.read
file.close

activate :deploy do |deploy|
  deploy.method = :ftp
  deploy.host = 'simonsmith.io'
  deploy.path = '/public_html'
  deploy.build_before = true
  deploy.user = 'simonsmi'
  deploy.password = password
end

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

helpers do
  def nav_active(url)
    'is-active' if current_page.url == url || current_page.data.type == 'post' && url == '/'
  end

  def markdown(text)
    Tilt['markdown'].new { text }.render
  end
end
