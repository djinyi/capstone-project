class PetsController < ApplicationController
    wrap_parameters format: []
    # skip_before_action :authorize, only: [:index, :destroy]

    def index
        pets = @current_user.pets.all.with_attached_images
        # pets = Pet.all.with_attached_images
        render json: pets, include: :user, status: :ok
    end

    def show
        pet = find_pet
        render json: pet, status: :ok
    end

    def create
        pet = @current_user.pets.create!(pet_params)
        render json: pet, status: :created
    end

    def pictures
        pet = find_pet
        images = rails_blob_path(pet.images)
        render json: {pet: pet.name, images: images}
    end

    def attach_picture
        pet = find_pet
        pet.images.attach(params[:images])
        render json: pet
    end


    def update
        pet = find_pet
        pet.update!(pet_params)
        render json: pet, status: :ok
    end

    def destroy
        pet = find_pet
        # pet = Pet.find_by(id: params[:id])
        if pet
            pet.destroy
            render json: {}, head: :no_content
        else
            not_authorized
        end
    end


    private

    def pet_params
        params.permit(:name, :breed, :description, :picture, :medical_needs, :notes, :dob)
    end

    def images_params
        params.permit(images:[])
    end

    def find_pet
        @current_user.pets.find_by(id: params[:id])
    end

    def contact_params
        params.permit(:name, :organization, :relationship, :phone_number, :address, :email, :notes)
    end

end
