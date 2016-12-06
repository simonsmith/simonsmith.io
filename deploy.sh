# Build the project.
hugo -d ../simonsmith.github.com

# Minify CSS
npm run build_css_min

# Change directory
cd ../simonsmith.github.com

# Add changes to git.
git add -A

# Commit changes.
msg="Build site"
git commit -m "$msg"

# Push source and build repos.
git push
