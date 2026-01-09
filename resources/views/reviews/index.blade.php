@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Reviews</h1>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <a href="{{ route('reviews.create') }}" class="btn btn-primary mb-3">Add New Review</a>

    <table class="table table-bordered table-hover">
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>User</th>
                <th>Technician</th>
                <th>Service Request ID</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($reviews as $review)
       <tr>
    <td>{{ $review->id }}</td>
    
    <!-- User -->
    <td>{{ optional($review->user)->name ?? 'Unassigned' }}</td>
    
    <!-- Technician -->
    <td>{{ optional($review->technician->user)->name ?? 'Unassigned' }}</td>
    
    <!-- Service Request ID -->
    <td>#{{ $review->service_request_id }}</td>
    
    <!-- Rating -->
    <td>
        @for ($i = 1; $i <= 5; $i++)
            @if($i <= $review->rating)
                <i class="fa fa-star text-warning"></i>
            @else
                <i class="fa fa-star text-secondary"></i>
            @endif
        @endfor
    </td>
    
    <!-- Comment -->
    <td>{{ $review->comment ?? '-' }}</td>
    
    <!-- Actions -->
    <td class="d-flex gap-1">
        <a href="{{ route('reviews.show', $review->id) }}" class="btn btn-info btn-sm">View</a>
        <a href="{{ route('reviews.edit', $review->id) }}" class="btn btn-warning btn-sm">Edit</a>
        <form action="{{ route('reviews.destroy', $review->id) }}" method="POST">
            @csrf
            @method('DELETE')
            <button onclick="return confirm('Are you sure you want to delete this review?')" class="btn btn-danger btn-sm">
                Delete
            </button>
        </form>
    </td>
</tr>

            @endforeach
        </tbody>
    </table>

    <div class="d-flex justify-content-center">
        {{ $reviews->links() }}
    </div>
</div>
@endsection
