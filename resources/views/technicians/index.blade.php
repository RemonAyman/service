@extends('layouts.app')

@section('content')
    <div class="container">
        <h3 class="mb-3">Technicians</h3>

        <a href="{{ route('technicians.create') }}" class="btn btn-primary mb-3">
            Add Technician
        </a>

        @if (session('message'))
            <div class="alert alert-success">{{ session('message') }}</div>
        @endif

        <table class="table table-bordered text-center">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Category</th>
                    <th>Experience</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($technicians as $item)
                    <tr>
                        <!-- ID -->
                        <td>{{ $item->id }}</td>

                        <!-- User -->
                        <td>{{ optional($item->user)->name ?? 'Unassigned' }}</td>

                        <!-- Category -->
                        <td>{{ optional($item->category)->name ?? '-' }}</td>

                        <!-- Experience Years -->
                        <td>{{ $item->experience_years }} {{ Str::plural('Year', $item->experience_years) }}</td>

                        <!-- Rating -->
                        <td>
                            @for ($i = 1; $i <= 5; $i++)
                                @if ($i <= $item->rating)
                                    <i class="fa fa-star text-warning"></i>
                                @else
                                    <i class="fa fa-star text-secondary"></i>
                                @endif
                            @endfor
                        </td>

                        <!-- Availability -->
                        <td>
                            @if ($item->is_available)
                                <span class="badge bg-success">Available</span>
                            @else
                                <span class="badge bg-danger">Not Available</span>
                            @endif
                        </td>

                        <!-- Actions -->
                        <td class="d-flex gap-1">
                            <a href="{{ route('technicians.show', $item->id) }}" class="btn btn-info btn-sm">Show</a>
                            <a href="{{ route('technicians.edit', $item->id) }}" class="btn btn-warning btn-sm">Edit</a>
                            <a style="color: black" href="{{ route('technicians.delete', $item->id) }}"
                                class="btn btn-danger btn-sm ">
                                Delete 
                            </a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
