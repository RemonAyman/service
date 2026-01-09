@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Review Details</h1>

    <div class="card">
       <div class="card-body">
    <h5 class="card-title">Review ID: {{ $review->id }}</h5>

    <!-- User -->
    <p class="card-text">
        <strong>User:</strong> {{ optional($review->user)->name ?? 'Unassigned' }}
    </p>

    <!-- Technician -->
    <p class="card-text">
        <strong>Technician:</strong> {{ optional($review->technician->user)->name ?? 'Unassigned' }}
    </p>

    <!-- Service Request -->
    <p class="card-text">
        <strong>Service Request ID:</strong> #{{ $review->service_request_id }}
    </p>

    <!-- Rating -->
    <p class="card-text">
        <strong>Rating:</strong>
        @for ($i = 1; $i <= 5; $i++)
            @if($i <= $review->rating)
                <i class="fa fa-star text-warning"></i>
            @else
                <i class="fa fa-star text-secondary"></i>
            @endif
        @endfor
    </p>

    <!-- Comment -->
    <p class="card-text">
        <strong>Comment:</strong> {{ $review->comment ?? '-' }}
    </p>
</div>

    </div>

    <a href="{{ route('reviews.index') }}" class="btn btn-primary mt-3">Back to Reviews</a>
</div>
@endsection
