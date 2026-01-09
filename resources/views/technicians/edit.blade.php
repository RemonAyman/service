@extends('layouts.app')

@section('content')
<div class="container">
    <h3>Edit Technician</h3>

    {{-- Validation Errors --}}
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul class="mb-0">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('technicians.update') }}">
        @csrf

        <input type="hidden" name="old_id" value="{{ $technicians->id }}">

        {{-- ID --}}
        <div class="mb-2">
            <label>ID</label>
            <input type="number" name="id"
                   class="form-control @error('id') is-invalid @enderror"
                   value="{{ old('id', $technicians->id) }}">
            @error('id')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        {{-- User --}}
        <div class="mb-2">
            <label>User</label>
            <select name="user_id"
                    class="form-control @error('user_id') is-invalid @enderror">
                @foreach($users as $user)
                    <option value="{{ $user->id }}"
                        {{ old('user_id', $technicians->user_id) == $user->id ? 'selected' : '' }}>
                        {{ $user->name }}
                    </option>
                @endforeach
            </select>
            @error('user_id')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        {{-- Category --}}
        <div class="mb-2">
            <label>Category</label>
            <select name="category_id"
                    class="form-control @error('category_id') is-invalid @enderror">
                @foreach($categories as $cat)
                    <option value="{{ $cat->id }}"
                        {{ old('category_id', $technicians->category_id) == $cat->id ? 'selected' : '' }}>
                        {{ $cat->name }}
                    </option>
                @endforeach
            </select>
            @error('category_id')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        {{-- Experience --}}
        <div class="mb-2">
            <label>Experience Years</label>
            <input type="number" name="experience_years"
                   class="form-control @error('experience_years') is-invalid @enderror"
                   value="{{ old('experience_years', $technicians->experience_years) }}">
            @error('experience_years')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        {{-- Rating --}}
        <div class="mb-2">
            <label>Rating</label>
            <input type="number" step="0.1" name="rating"
                   class="form-control @error('rating') is-invalid @enderror"
                   value="{{ old('rating', $technicians->rating) }}">
            @error('rating')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        {{-- Status --}}
        <div class="mb-3">
            <label>Status</label>
            <select name="is_available"
                    class="form-control @error('is_available') is-invalid @enderror">
                <option value="1" {{ old('is_available', $technicians->is_available) == 1 ? 'selected' : '' }}>
                    Available
                </option>
                <option value="0" {{ old('is_available', $technicians->is_available) == 0 ? 'selected' : '' }}>
                    Not Available
                </option>
            </select>
            @error('is_available')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        <button class="btn btn-primary">Update</button>
        <a href="{{ route('technicians.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div>
@endsection
