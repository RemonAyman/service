@extends('layouts.app')

@section('content')
<div class="container">
    <h3>Technician Details</h3>

    <div class="card">
       <div class="card-body">
    <!-- ID -->
    <p><strong>ID:</strong> {{ $technicians->id }}</p>

    <!-- User -->
    <p><strong>User:</strong> {{ optional($technicians->user)->name ?? 'Unassigned' }}</p>

    <!-- Category -->
    <p><strong>Category:</strong> {{ optional($technicians->category)->name ?? '-' }}</p>

    <!-- Experience -->
    <p>
        <strong>Experience:</strong>
        {{ $technicians->experience_years }} {{ Str::plural('Year', $technicians->experience_years) }}
    </p>

    <!-- Rating -->
    <p>
        <strong>Rating:</strong>
        @for ($i = 1; $i <= 5; $i++)
            @if($i <= $technicians->rating)
                <i class="fa fa-star text-warning"></i>
            @else
                <i class="fa fa-star text-secondary"></i>
            @endif
        @endfor
    </p>

    <!-- Status -->
    <p>
        <strong>Status:</strong>
        @if($technicians->is_available)
            <span class="badge bg-success">Available</span>
        @else
            <span class="badge bg-danger">Not Available</span>
        @endif
    </p>
</div>

    </div>

    <a href="{{ route('technicians.index') }}" class="btn btn-secondary mt-3">Back</a>
</div>
@endsection
