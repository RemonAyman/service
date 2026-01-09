@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Edit Service Request</h1>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('service_requests.update', $request->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="id" class="form-label">ID</label>
            <input type="number" name="id" class="form-control" value="{{ old('id', $request->id) }}">
        </div>
        <div class="mb-3">
            <label for="user_id" class="form-label">User</label>
            <select name="user_id" class="form-select" required>
                @foreach($users as $user)
                    <option value="{{ $user->id }}" {{ old('user_id', $request->user_id) == $user->id ? 'selected' : '' }}>
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
                    <option value="{{ $tech->id }}" {{ old('technician_id', $request->technician_id) == $tech->id ? 'selected' : '' }}>
                        {{ $tech->user->name ?? 'N/A' }}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="mb-3">
            <label for="service_id" class="form-label">Service</label>
            <select name="service_id" class="form-select" required>
                @foreach($services as $service)
                    <option value="{{ $service->id }}" {{ old('service_id', $request->service_id) == $service->id ? 'selected' : '' }}>
                        {{ $service->name }}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select name="status" class="form-select" required>
                <option value="pending" {{ old('status', $request->status) == 'pending' ? 'selected' : '' }}>Pending</option>
                <option value="in_progress" {{ old('status', $request->status) == 'in_progress' ? 'selected' : '' }}>In Progress</option>
                <option value="completed" {{ old('status', $request->status) == 'completed' ? 'selected' : '' }}>Completed</option>
            </select>
        </div>

        <button type="submit" class="btn btn-success">Update Request</button>
        <a href="{{ route('service_requests.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div>
@endsection
