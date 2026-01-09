@extends('layouts.app')
                            <title>Dashboard</title>
 @section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 m-auto">
                <form enctype="multipart/form-data" action={{ route('categories.update', $categories->id) }} method="POST">
                    @csrf <input type="hidden" name="old_id" value={{ $categories->id }}> <img
                        src={{ asset('/img/category/' . $categories->image) }} style="width: 45px;"> <label
                        id="image">{{ __("Image") }}</label> <input type="file" name="image" class="mb-2 form-control"
                        id="image"> @error('image')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror <label for="id">{{ __("ID") }}</label> <input value={{ $categories->id }} type="text"
                        id="id" name="id" class="form-control mb-2"> @error('id')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror <label for="name">{{ __("Name") }}</label> <input value={{ $categories->name }} type="text"
                        id="name" name="name" class="form-control mb-2"> @error('name')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror 
                     <label for="description">{{ __("Description") }}</label> <input type="text"
                        value="{{ $categories->description }}" id="description" name="description"
                        class="form-control mb-2"> @error('description')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
                     <input type="submit" style="width: 100%;color:white ; background: linear-gradient(90deg, #2b5876, #4e4376);"
                     value="{{ __("Updata") }}" class="form-control w-100">
                </form>
            </div>
        </div>
    </div>
@endsection
