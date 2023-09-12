class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :show, :index, :destroy]

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            record_error
        end
    end

    def index
        users = User.all 
        render json: users
    end

    def show
        user = User.find(session[:user_id])
        render json: user, include: ['pets', 'pets.contacts']
    end

    def destroy
        photograph = User.find_by(id: params[:id])
        if photograph
            photograph.destroy
            render json: {}, head: :no_content
        else
            render_not_found_response
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

    def record_error
        render json: {errors: "Password can't be blank, Username can't be blank, Username is too short (minimum is 2 characters)"}, status: :unprocessable_entity
    end
end
