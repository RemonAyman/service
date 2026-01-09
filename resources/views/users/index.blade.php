@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="card" >
                @if (session('text'))
                <h4 class=" text-center alert alert-success">{{ session('text') }}
                    
                </h4>
                    
                @endif
  <div class="card-header ">
    
    USERS <span class="btn btn-outline-secondary">{{ $users->count() }}</span>
    <span> <a href={{route('users.create') }} class="btn btn-success" ><i class="bi bi-person-plus-fill"></i></a></span>
  </div>
  <table class="table text-center align-middle">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Operation</th>
    </tr>
  </thead>
  <tbody>
    @foreach ($users as $item )
        <tr>
        
            <td>{{$item->id}}</td>
            <td>{{$item->name}}</td>
            <td>{{$item->email}}</td>
            <td>
                <a href={{ route('users.show',$item->id) }} class="btn btn-success"> <i class="fa-solid fa-eye"></i></a>
                <a href={{ route('users.edit',$item->id) }}  class="btn btn-primary text-light"><i class="fa-solid fa-pen-to-square"></i></a>
                <a href={{ route('users.delete',$item->id) }} class="btn btn-danger"><i class="fa-solid fa-trash"></i></a>
            </td>
        </tr>
    @endforeach
  </tbody>
</table>
</div>
        </div>
    </div>
</div>
@endsection