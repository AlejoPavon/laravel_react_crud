<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDeveloperRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Authorization is handled by Sanctum middleware
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'main_stack' => ['required', 'string', 'max:100'],
            'seniority' => ['required', Rule::in(['JR', 'SSR', 'SR'])],
            'hourly_rate' => ['required', 'numeric', 'min:0', 'max:9999.99'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'seniority.in' => 'The seniority must be one of: JR, SSR, SR',
            'hourly_rate.min' => 'The hourly rate must be at least 0',
            'hourly_rate.max' => 'The hourly rate may not exceed 9999.99',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_active' => $this->boolean('is_active', true),
        ]);
    }
}