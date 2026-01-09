@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Service Request Details</h1>

    <div class="card">
       <div class="card-body">
    <h5 class="card-title">Request ID: {{ $request->id }}</h5>

    <!-- User -->
    <p class="card-text">
        <strong>User:</strong> {{ optional($request->user)->name ?? 'Unassigned' }}
    </p>

    <!-- Technician -->
    <p class="card-text">
        <strong>Technician:</strong> {{ optional($request->technician->user)->name ?? 'Unassigned' }}
    </p>

    <!-- Service -->
    <p class="card-text">
        <strong>Service:</strong> {{ optional($request->service)->name ?? 'N/A' }}
    </p>

    <!-- Status -->
    <p class="card-text">
        <strong>Status:</strong> 
        <span class="{{ $request->status === 'completed' ? 'text-success' : 'text-warning' }}">
            {{ ucfirst($request->status) }}
        </span>
    </p>
</div>

    </div>

    <a href="{{ route('service_requests.index') }}" class="btn btn-primary mt-3">Back to Requests</a>
</div>
@endsection
