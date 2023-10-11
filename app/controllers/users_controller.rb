class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        user = User.find_by(id: params[:id])
        if user
            user.update!(user_params)
            render json: user, status: :ok
        else
            not_authorized
        end
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
        if user
            user.destroy
            render json: {}, head: :no_content
        else
            render_not_found_response
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :name, :dob, :email, :phone_number, :address)
    end

end
