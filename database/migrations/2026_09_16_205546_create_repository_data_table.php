<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRepositoryDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('repository_data', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('repository_id');
            $table->string('title');
            $table->string('rows');
            $table->string('columns');
            $table->string('size');
            $table->string('url');
            $table->string('type');
            $table->timestamps();


            $table->foreign('repository_id')->references('id')->on('repositories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('repository_data');
    }
}
