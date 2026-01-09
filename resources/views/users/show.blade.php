@extends('layouts.app')
@section('content')
<div class="container mt-4 pt-4">
    <div class="row">
        <div class="col-md-12">
            <div class="card" >
  <div class="card-header">
    {{ __("User Details") }} <span class="btn btn-success">{{$users->id}}</span>
  </div>
  <table class="table text-center align-middle ">
  <thead>
    <tr>
      <th scope="col">{{ __("ID") }}</th>
      <th scope="col">{{ __("Name") }}</th>
      <th scope="col">{{ __("Email") }}</th>
      <th scope="col">{{ __("Password") }}</th>
      <th scope="col">{{ __("Phone") }}</th>
      <th scope="col">{{ __("Address") }}</th>
      <th scope="col">{{ __("Role") }}</th>
      <th scope="col">{{ __("Operation") }}</th>
    </tr>
  </thead>
  <tbody>
   
        <tr>
        
            <td>{{$users->id}}</td>
            <td>{{$users->name}}</td>
            <td>{{$users->email}}</td>
            <td>{{$users->password}}</td>
            <td>{{$users->phone}}</td>
            <td>{{$users->address}}</td>
            <td>{{$users->role}}</td>
            <td>
                <a href={{ route('users.index') }} class="btn btn-success"> <i class="fa-solid fa-home"></i></a>
                
            </td>
        </tr>
  
  </tbody>
</table>
</div>
        </div>
    </div>
</div>
@endsection