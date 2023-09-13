class ContactsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    wrap_parameters format: []
    skip_before_action :authorize, only: [:index, :show, :create_new, :destroy]

    def index
        contacts = Contact.all
        render json: contacts, status: :ok
    end

    def show
        contact = find_contact
        if Contact.user.match?(@current_user)
            render json: contact, status: :ok
        else
            render_not_found_response
        end
    end

    def create_new
        pet = Pet.find_by(id: params[:pet_id])
        contact = pet.contacts.create!(contact_params)
        render json: contact, status: :created
    end

    def update
        contact = find_contact
        if contact
            Contact.update!(contact_params)
            render json: contact, status: :ok
        else
            not_authorized
        end
    end

    def destroy
        contact = Contact.find_by(id: params[:id])
        if contact
            contact.destroy
            render json: {}, head: :no_content
        else
            not_authorized
        end
    end


    private

    def contact_params
        params.permit(:name, :organization, :relationship, :phone_number, :address, :email, :notes)
    end

    def find_contact
        @current_user.contacts.find_by(id: params[:id])
    end

    def render_not_found_response
        render json: {error: "Contact Not Found"}, status: :not_found
    end
    
    def not_authorized
        render json: {errors: "Not authorized."}, status: :unprocessable_entity
    end

    def render_unprocessable_entity_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
