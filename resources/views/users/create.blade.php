@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 m-auto">
            
            <form action=
            {{ route('users.store')}} method="post" enctype="multipart/form-data">
                @csrf
<label for="id">{{ __("ID") }}</label>
<input type="number" name="id" class="form-control mb-3">
@error('id')
    <div class="alert alert-danger">{{ $message }}</div>
@enderror
<label for="name">{{ __("Name") }}</label>
<input type="text" name="name" class="form-control mb-3">
@error('name')
    <div class="alert alert-danger">{{ $message }}</div>
@enderror
<label for="email">{{ __("Email") }}</label>
<input type="email" name="email" class="form-control mb-3">
@error('email')
    <div class="alert alert-danger">{{ $message }}</div>
@enderror
<label for="password">Password</label>
<input type="text" name="password" class="form-control mb-3">
@error('password')
    <div class="alert alert-danger">{{ $message }}</div>
@enderror
<label for="phone">{{ __("Phone") }}</label>
<input type="text" name="phone" class="form-control mb-3">
@error('phone')
    <div class="alert alert-danger">{{ $message }}</div>
@enderror
<label for="address">{{ __("Address") }}</label>

<input type="text" name="address" class="form-control mb-3">
@error('address')
    <div class="alert alert-danger">{{ $message }}</div>
@enderror
<label for="role">{{ __("Role") }}</label>
<select class="form-control mb-3" name="role" id="role">
    <option value="user">{{ __("User") }}</option>
    <option value="admin">{{ __("Admin") }}</option>
</select>
<input type="submit" class="w-100 btn btn-success" value="{{ __("Create New Account") }}">
            </form>
        </div>
    </div>
</div>
@endsection