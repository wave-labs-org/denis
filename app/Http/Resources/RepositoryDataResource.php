<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RepositoryDataResource extends JsonResource
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
            'repository_id' => $this->repository_id,
            'type' => $this->type,
            'title' => $this->title,
            'rows' => $this->rows,
            'column' => $this->column,
            'size' => $this->size,
            'url' => asset($this->url),
        ];
    }
}
