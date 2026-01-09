@extends('layouts.app')
                            <title>Dashboard</title>

@section('content')
<div class="container-fluid py-4">
    <div class="row justify-content-center">
        <div class="col-md-10 mt-2">
            <div class="card shadow-lg rounded-3 border-0">

                {{-- رسالة نجاح --}}
                @if (session('cate'))
                    <h4 class="text-center alert alert-success ">{{ session('cate') }}</h4>
                @endif

                {{-- الهيدر --}}
                <div class="card-header d-flex justify-content-between align-items-center text-white" 
                     style="background: linear-gradient(90deg, #2b5876, #4e4376); border-top-left-radius: 8.5px; border-top-right-radius: 8.5px;">
                    <h5 class="mb-0">
                        <i class="fa-solid fa-layer-group"></i> 
                        {{ __('CATEGORIES') }} 
                        <span class="badge bg-light text-dark">{{ $categories->count() }}</span>
                    </h5>
                    <a class="btn btn-light btn-sm rounded-circle" href="{{ route('categories.create') }}">
                        <i class="fa-solid fa-plus"></i>
                    </a>
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
                            @foreach ($categories as $item)
                                <tr>
                                    <td style="text-align: center">
                                        <img style="width: 50px" src="{{ asset(
                                        'img/category/'.$item->image) }}">
                                    </td>
                                    <td>{{ $item->id }}</td>
                                    <td>{{ $item->name }}</td>
                                    <td>{{ $item->description }}</td>
                                    <td>
                                        <a href="{{ route('categories.show',$item->id) }}" class="btn btn-sm btn-outline-success rounded-circle">
                                            <i class="fa-solid fa-eye"></i>
                                        </a>
                                        <a href="{{ route('categories.edit',$item->id) }}" class="btn btn-sm btn-outline-warning rounded-circle">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </a>
                                        <a href="{{ route('categories.delete',$item->id) }}" class="btn btn-sm btn-outline-danger rounded-circle">
                                            <i class="fa-solid fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</div>
@endsection
