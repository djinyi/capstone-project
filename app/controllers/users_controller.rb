class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :show, :change, :index, :destroy]

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
            user.update!(asuser_params)
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
        render json: user, include: ['pets', 'pets.contacts']
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

    def change
        user = User.find_by(id: params[:id])
        pet = user.pets.create(pet_params)
        if pet.valid?
            render json: pet, status: :created
        else
            render json: { error: "Name can't be blank" }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:id, :username, :password, :password_confirmation, :name, :dob, :email, :phone_number, :address)
    end

    def pet_params
        params.permit(:name, :breed, :description, :picture, :medical_needs, :dob, :notes)
    end

    def asuser_params
        params.permit(:username, :name, :dob, :email, :phone_number, :address)
    end

    def record_error
        render json: {errors: "Password can't be blank, Username can't be blank, Username is too short (minimum is 2 characters)"}, status: :unprocessable_entity
    end
end
