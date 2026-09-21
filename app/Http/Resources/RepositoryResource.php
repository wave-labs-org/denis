<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RepositoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'doi' => $this->doi,
            'authors' => $this->authors,
            'title' => $this->title,
            'citation' => $this->citation,
            'submission' => $this->submission,
            'license' => $this->license,
            'size' => $this->size,
            'zip' => asset($this->zip),
            'data' => RepositoryDataResource::collection($this->data),
        ];
    }
}
