@extends('layouts.app')
                            <title>Dashboard</title>

@section('content')
<div class="container mt-5 pt-4">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card shadow-lg border-0 rounded-3 overflow-hidden">

                {{-- --}}
                <div class="card-header text-white" 
                     style="background: linear-gradient(90deg, #2b5876, #4e4376);">
                    <h5 class="mb-0 text-center">
                        {{ __('Category_Details') }}
                        <span class="badge bg-light text-dark ms-2">{{ $categories->id }}</span>
                    </h5>
                </div>

                {{-- الجدول --}}
                <div class="card-body p-0">
                    <table class="table table-hover text-center align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th scope="col">{{ __('Image') }}</th>
                                <th scope="col">{{ __('ID') }}</th>
                                <th scope="col">{{ __('Name') }}</th>
                                <th scope="col">{{ __('Description') }}</th>
                                <th scope="col">{{ __('Operation') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img style="width: 50px" src="{{ asset('img/category/'.$categories->image) }}">
                                </td>
                                <td>{{ $categories->id }}</td>
                                <td>{{ $categories->name }}</td>
                                <td>{{ $categories->description }}</td>
                                
                                <td>
                                    <a class="btn btn-outline-success btn-sm rounded-circle" 
                                       href="{{ route('categories.index') }}">
                                        <i class="fa-solid fa-house"></i>
                                    </a> 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</div>
@endsection
