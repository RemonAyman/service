@extends('layouts.app')

@section('content')
<title>Dashboard</title>

<div class="container">
    <div class="row">
        <div class="col-md-10 m-auto">

            <form action="{{ route('users.update', $users->id) }}" method="POST">
                @csrf

                <input type="hidden" name="old_id" value="{{ $users->id }}">

                {{-- ID --}}
                <label for="id">{{ __('ID') }}</label>
                <input type="text" id="id" name="id"
                       value="{{ $users->id }}"
                       class="form-control mb-2">
                @error('id')
                    <div class="alert alert-danger">{{ $message }}</div>
                @enderror

                {{-- Name --}}
                <label for="name">{{ __('Name') }}</label>
                <input type="text" id="name" name="name"
                       value="{{ $users->name }}"
                       class="form-control mb-2">
                @error('name')
                    <div class="alert alert-danger">{{ $message }}</div>
                @enderror

                {{-- Email --}}
                <label for="email">{{ __('Email') }}</label>
                <input type="text" id="email" name="email"
                       value="{{ $users->email }}"
                       class="form-control mb-2">
                @error('email')
                    <div class="alert alert-danger">{{ $message }}</div>
                @enderror

                
                {{-- Password --}}
<label for="password">{{ __('Password') }}</label>

<div class="input-group mb-2">
    <input
        type="password"
        id="password"
        name="password"
        value="{{ $users->password }}"
        class="form-control"
    >

    <span class="input-group-text" style="cursor: pointer" onclick="togglePassword()">
        <i id="eyeIcon" class="fa fa-eye"></i>
    </span>
</div>

@error('password')
    <div class="alert alert-danger">{{ $message }}</div>
@enderror


                {{-- Phone --}}
                <label for="phone">{{ __('Phone') }}</label>
                <input type="text" id="phone" name="phone"
                       value="{{ $users->phone }}"
                       class="form-control mb-2">
                @error('phone')
                    <div class="alert alert-danger">{{ $message }}</div>
                @enderror

                {{-- Address --}}
                <label for="address">{{ __('Address') }}</label>
                <input type="text" id="address" name="address"
                       value="{{ $users->address }}"
                       class="form-control mb-2">
                @error('address')
                    <div class="alert alert-danger">{{ $message }}</div>
                @enderror

                {{-- Role --}}
                <label for="role">{{ __('Role') }}</label>
                <select class="form-control mb-4" name="role" id="role">
                    <option value="user" {{ $users->role == 'user' ? 'selected' : '' }}>
                        {{ __('User') }}
                    </option>
                    <option value="admin" {{ $users->role == 'admin' ? 'selected' : '' }}>
                        {{ __('Admin') }}
                    </option>
                </select>

                <input type="submit"
                       value="{{ __('Update') }}"
                       class="btn btn-success w-100">

            </form>

        </div>
    </div>
</div>
@endsection
<script>
    function togglePassword() {
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.getElementById('eyeIcon');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
        }
    }
</script>

