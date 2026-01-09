@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Services</h1>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <a href="{{ route('services.create') }}" class="btn btn-primary mb-3">Add New Service</a>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Estimated Time</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($services as $service)
            <tr>
                 <td>{{ $service->id }}</td>
            <td>{{ $service->name }}</td>
            <td>{{ optional($service->category)->name ?? 'No Category' }}</td>
            <td>${{ number_format($service->price, 2) }}</td>
           <td>{{ $service->estimated_time }} hours</td>
                <td>
                    <a href="{{ route('services.show', $service->id) }}" class="btn btn-info btn-sm">View</a>
                    <a href="{{ route('services.edit', $service->id) }}" class="btn btn-warning btn-sm">Edit</a>
                    <form action="{{ route('services.destroy', $service->id) }}" method="POST" style="display:inline-block;">
                        @csrf
                        @method('DELETE')
                        <button onclick="return confirm('Are you sure?')" class="btn btn-danger btn-sm">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    {{ $services->links() }}
</div>
@endsection
