<?php

namespace App\Http\Requests;

use App\Models\Country;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\Console\Output\ConsoleOutput;

class ReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if ($this->header('Authorization'))
            return auth()->user()->id;
    }

    protected function prepareForValidation()
    {
        $otherHabitat = "";
        $habitat = $this->debris_habitat;

        $otherRugosity = "";
        $rugosity = $this->debris_rugosity;

        if (!is_numeric($this->debris_habitat)) {
            $habitat = 12;
            $otherHabitat = $this->debris_habitat;
        }

        if (!is_numeric($this->debris_rugosity)) {
            $rugosity = 7;
            $otherRugosity = $this->debris_rugosity;
        }

        // verify if country can be cast to integer, if not try to find the country by name
        if (!is_numeric($this->country)) {
            $country = Country::where('name', 'like', '%' . $this->country . '%')->first();
        } else {
            $country = Country::find($this->country);
        }

        $this->merge([
            'date' => $this->date_type == "range" ? $this->date[0] : $this->date,
            'final_date' => $this->date_type == "range" ? $this->date[1] : null,
            'user_id' => auth()->user()->id,
            'country' => $country ? $country->id : null,
            'debris_habitat' => $habitat,
            'debris_otherHabitat' => $otherHabitat,
            'debris_rugosity' => $rugosity,
            'debris_otherRugosity' => $otherRugosity,
            'debris_depth' => $this->debris_depth == "" ? 0 : $this->debris_depth,
            'taxas' => json_decode($this->taxas, true),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => 'required|integer|exists:users,id',
            'country' => 'required|integer|exists:countries,id',
            'lme' => 'nullable|integer|exists:lmes,id',
            'region' => 'required',
            'site' => 'required',
            'notes' => 'nullable',
            'doi' => 'nullable',
            'title_publication' => 'nullable',
            'journal_publication' => 'nullable',
            'year_publication' => 'nullable',
            'volume_publication' => 'nullable',
            'pages_publication' => 'nullable',
            'first_author' => 'nullable',
            'authors' => 'nullable',
            'ongoing_survey' => 'nullable',
            'custom_id' => 'nullable',
            'date' => 'required|date',
            'date_type' => 'required|string',
            'final_date' => 'nullable|date',
            'latitude' => ['required', 'regex:/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,20})?))$/'],
            'longitude' => ['required', 'regex:/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,20})?))$/'],

            'debris_type' => 'required|integer|exists:debris_types,id',
            'debris_depth' => 'required_if:debris_type,2|numeric',
            'debris_habitat' => 'required|integer|exists:debris_habitats,id',
            'debris_size' => 'required|integer|exists:debris_sizes,id',
            'debris_weight' => 'nullable|numeric',
            'debris_thickness' => 'nullable|integer|exists:debris_thicknesses,id',
            'debris_rugosity' => 'nullable|integer|exists:debris_rugosities,id',
            'debris_sub_category' => 'required|array|max:2|min:1',
            'debris_sub_category.0' => 'required|integer|exists:debris_categories,id',
            'debris_sub_category.1' => 'nullable|integer|exists:debris_sub_categories,id',
            'debris_marks' => 'nullable|string',
            'debris_origin' => 'nullable|string',
            'debris_otherHabitat' => 'required_without:debris_habitat|string',
            'debris_otherRugosity' => 'nullable:debris_rugosity|string',

            'taxas' => 'required|array|min:1',
            'taxas.*.level' => 'required|integer|exists:taxa_levels,id',
            'taxas.*.identification' => 'required|string',
            'taxas.*.authority' => 'nullable|string',
            'taxas.*.year_first_report' => 'nullable|string',
            'taxas.*.species_status' => 'nullable|integer|exists:taxa_species_statuses,id',
            'taxas.*.population_status' => 'nullable|integer|exists:taxa_population_statuses,id',
            'taxas.*.abundance' => 'nullable|integer|exists:taxa_abundances,id',
            'taxas.*.viability' => 'required|integer|exists:taxa_viabilities,id',
            'taxas.*.maturity' => 'required|array|min:1',
            'taxas.*.maturity.*' => 'required|integer|exists:taxa_maturities,id',
            'taxas.*.native_region' => 'nullable|array',
            'taxas.*.native_region.*' => 'integer|exists:taxa_native_regions,id',
            'taxas.*.asisk_score' => 'nullable|string',
            'taxas.*.asisk_result' => 'nullable|string',

            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,tiff',
        ];
    }

    /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'latitude.regex' => 'The latitude format is invalid. Latitude range from -90 to 90',
            'longitude.regex' => 'The longitude format is invalid. Longitude range from -180 to 80',
            'name.required' => 'Reservation requires a reservation name',
            'email.required' => 'Reservation requires a contact email',
            'address.required' => 'Pickup address is required',
            'person.size' => 'Information for all participants is required',
            'person.*.birthday.required' => 'Birthday for all participants is required',
            'person.*.gender.required' => 'Gender for all participants is required',
            'person.*.height.required' => 'Height for all participants is required',
            'person.*.shoe.required' => 'Show size for all participants is required',
            'person.*.weight.required' => 'Weight for all participants is required',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422));
    }
}
