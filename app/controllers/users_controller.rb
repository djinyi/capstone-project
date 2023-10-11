class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def update
        user = User.find_by(id: params[:id])
        user.update!(user_params)
        render json: user, status: :ok
    end

    def index
        users = User.all 
        render json: users
    end

    def show
        user = User.find(session[:user_id])
        render json: user
    end

    def destroy
        user = User.find_by(id: params[:id])
        user.destroy
        render json: {}, head: :no_content
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :name, :email, :phone_number, :address, :birthday)
    end

end
