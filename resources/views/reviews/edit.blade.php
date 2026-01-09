@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Edit Review</h1>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('reviews.update', $review->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="user_id" class="form-label">User</label>
            <select name="user_id" class="form-select" required>
                @foreach($users as $user)
                    <option value="{{ $user->id }}" {{ old('user_id', $review->user_id) == $user->id ? 'selected' : '' }}>
                        {{ $user->name }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="mb-3">
            <label for="technician_id" class="form-label">Technician (optional)</label>
            <select name="technician_id" class="form-select">
                <option value="">Select Technician</option>
                @foreach($technicians as $tech)
                    <option value="{{ $tech->id }}" {{ old('technician_id', $review->technician_id) == $tech->id ? 'selected' : '' }}>
                        {{ $tech->user->name ?? 'N/A' }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="mb-3">
            <label for="service_request_id" class="form-label">Service Request</label>
            <select name="service_request_id" class="form-select" required>
                @foreach($serviceRequests as $request)
                    <option value="{{ $request->id }}" {{ old('service_request_id', $review->service_request_id) == $request->id ? 'selected' : '' }}>
                        Request #{{ $request->id }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="mb-3">
            <label for="rating" class="form-label">Rating (1-5)</label>
            <input type="number" name="rating" class="form-control" min="1" max="5" value="{{ old('rating', $review->rating) }}" required>
        </div>

        <div class="mb-3">
            <label for="comment" class="form-label">Comment</label>
            <textarea name="comment" class="form-control" rows="3">{{ old('comment', $review->comment) }}</textarea>
        </div>

        <button type="submit" class="btn btn-success">Update Review</button>
        <a href="{{ route('reviews.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div>
@endsection
