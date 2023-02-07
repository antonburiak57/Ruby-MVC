class UrlsController < ApplicationController
    def index
        @urls = Url.all
        
        render json: { success: true, urls: @urls }, status: 200
    rescue => e
        puts e
        render json: { success: false, message: e.message }, status: 500
    end

    def create
        if params[:url] and params[:url].count.positive?
            Url.delete_all

            params[:url].each do |url|
                @url = Url.create(
                    url: url
                )
            end
        end

        render json: { success: true }, status: 200
    rescue => e
        puts e
        render json: { success: false, message: e.message }, status: 500
    end
end
