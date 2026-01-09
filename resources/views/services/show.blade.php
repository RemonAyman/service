@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Service Details</h1>

    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ $service->name }} (ID: {{ $service->id }})</h5>
            <p class="card-text"><strong>Category:</strong> {{ $service->category->name }}</p>
            <p class="card-text"><strong>Description:</strong> {{ $service->description }}</p>
            <p class="card-text"><strong>Price:</strong> ${{ $service->price }}</p>
            <p class="card-text"><strong>Estimated Time:</strong> {{ $service->estimated_time }}</p>
        </div>
    </div>

    <h3 class="mt-4">Service Requests</h3>
    @if($service->serviceRequests->count())
        <ul class="list-group">
            @foreach($service->serviceRequests as $request)
                <li class="list-group-item">
                    Request ID: {{ $request->id }}, User ID: {{ $request->user_id }}, Status: {{ $request->status ?? 'Pending' }}
                </li>
            @endforeach
        </ul>
    @else
        <p>No service requests found.</p>
    @endif

    <a href="{{ route('services.index') }}" class="btn btn-primary mt-3">Back to Services</a>
</div>
@endsection
