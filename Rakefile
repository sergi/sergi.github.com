def jekyll(opts = "", path = "/usr/bin/")
  sh "rm -rf _site"
  sh path + "jekyll " + opts
end

desc "Build site using Jekyll"
task :build do
  jekyll
end

desc "Serve on Localhost with port 4000"
task :default do
  jekyll("--server --auto")
end

task :stable do
  jekyll("--server --auto", "")
end

desc "Deploy to Live"
task :deploy => :"deploy:live"

namespace :deploy do
  desc "Deploy to Live"
  task :live => :build do
    rsync "sergimansilla.com"
  end

  def rsync(domain)
    sh "rsync -rtz --delete _site/ mrclash@sergimansilla.com:~/#{domain}/"
    sh "rsync -rtz projects/ mrclash@sergimansilla.com:~/#{domain}/"
  end
end

#from http://arjanvandergaag.nl/blog/creating-new-jekyll-posts.html
desc 'create a new draft post'
task :post do
  title = ENV['TITLE']
  slug = "#{Date.today}-#{title.downcase.gsub(/[^\w]+/, '-')}"

  file = File.join(
    File.dirname(__FILE__),
    '_posts',
    slug + '.markdown'
  )

  File.open(file, "w") do |f|
    f << <<-EOS.gsub(/^    /, '')
    ---
    layout: post
    title: #{title}
    published: false
    categories:
    ---

    EOS
  end

  system ("#{ENV['EDITOR']} #{file}")
end

