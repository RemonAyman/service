@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Service Requests</h1>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <a href="{{ route('service_requests.create') }}" class="btn btn-primary mb-3">Add New Request</a>

    <table class="table table-bordered table-hover">
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>User</th>
                <th>Technician</th>
                <th>Service</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($requests as $request)
           <tr>
    <!-- ID -->
    <td>{{ $request->id }}</td>

    <!-- User -->
    <td>{{ optional($request->user)->name ?? 'Unassigned' }}</td>

    <!-- Technician -->
    <td>{{ optional($request->technician->user)->name ?? 'Unassigned' }}</td>

    <!-- Service -->
    <td>{{ optional($request->service)->name ?? 'N/A' }}</td>

    <!-- Status -->
    <td>{{ ucfirst($request->status) }}</td>

    <!-- Actions -->
    <td class="d-flex gap-1">
        <a href="{{ route('service_requests.show', $request->id) }}" class="btn btn-info btn-sm">View</a>
        <a href="{{ route('service_requests.edit', $request->id) }}" class="btn btn-warning btn-sm">Edit</a>
        <form action="{{ route('service_requests.destroy', $request->id) }}" method="POST">
            @csrf
            @method('DELETE')
            <button onclick="return confirm('Are you sure you want to delete this request?')" class="btn btn-danger btn-sm">
                Delete
            </button>
        </form>
    </td>
</tr>

            @endforeach
        </tbody>
    </table>

    <div class="d-flex justify-content-center">
        {{ $requests->links() }}
    </div>
</div>
@endsection
