class HomeController < ApplicationController
  def index
    @urls = Url.all.order(created_at: :desc)
  end
end
