<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito:400,600,700" rel="stylesheet">

    <!-- Icons & Bootstrap -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.13.1/font/bootstrap-icons.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        :root{
            --primary:#2563eb;
            --secondary:#6366f1;
            --accent:#facc15;
            --dark:#0f172a;
        }

        body{
            font-family:'Nunito',sans-serif;
        }

        /* Navbar */
        .navbar-custom{
            background:linear-gradient(135deg,var(--dark),var(--primary));
        }

        .navbar-brand{
            color:#fff !important;
            font-weight:700;
            letter-spacing:.5px;
        }

        .navbar-custom .nav-link{
            color:#e5e7eb !important;
            position:relative;
            display:flex;
            align-items:center;
            gap:6px;
            transition:.3s ease;
            font-weight:600;
        }

        .navbar-custom .nav-link i{
            font-size:14px;
            opacity:.85;
        }

        .navbar-custom .nav-link:hover{
            color:var(--accent) !important;
        }

        /* Active link */
        .navbar-custom .nav-link.active{
            color:var(--accent) !important;
        }

        .navbar-custom .nav-link.active::after{
            content:'';
            position:absolute;
            left:0;
            bottom:-6px;
            width:100%;
            height:3px;
            background:var(--accent);
            border-radius:3px;
            animation:slide .3s ease;
        }

        @keyframes slide{
            from{width:0;left:50%}
            to{width:100%;left:0}
        }

        /* Dropdown */
        .dropdown-menu{
            background:#1e293b;
            border:none;
            border-radius:10px;
            overflow:hidden;
        }

        .dropdown-item{
            color:#e5e7eb !important;
            transition:.25s;
        }

        .dropdown-item:hover{
            background:rgba(255,255,255,.1);
            color:#fff !important;
        }

        /* Toggler */
        .navbar-toggler{
            border:none;
        }

        .navbar-toggler-icon{
            filter:invert(1);
        }
    </style>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<div id="app">

    <nav class="navbar navbar-expand-md navbar-custom shadow-sm">
        <div class="container">

            <a class="navbar-brand" href="{{ url('/') }}">
                <i class="fa-solid fa-layer-group me-1"></i>
                {{ config('app.name', 'Laravel') }}
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <ul class="navbar-nav ms-auto align-items-md-center">

                    @auth
                        <li class="nav-item">
                            <a class="nav-link {{ request()->routeIs('users.*') ? 'active' : '' }}"
                               href="{{ route('users.index') }}">
                                <i class="fa-solid fa-users"></i> Users
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link {{ request()->routeIs('categories.*') ? 'active' : '' }}"
                               href="{{ route('categories.index') }}">
                                <i class="fa-solid fa-layer-group"></i> Categories
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link {{ request()->routeIs('technicians.*') ? 'active' : '' }}"
                               href="{{ route('technicians.index') }}">
                                <i class="fa-solid fa-user-gear"></i> Technicians
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link {{ request()->routeIs('service-requests.*') ? 'active' : '' }}"
                               href="{{ route('service_requests.index') }}">
                                <i class="fa-solid fa-file-circle-check"></i> Service Requests
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link {{ request()->routeIs('services.*') ? 'active' : '' }}"
                               href="{{ route('services.index') }}">
                                <i class="fa-solid fa-screwdriver-wrench"></i> Services
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link {{ request()->routeIs('reviews.*') ? 'active' : '' }}"
                               href="{{ route('reviews.index') }}">
                                <i class="fa-solid fa-star"></i> Reviews
                            </a>
                        </li>
                       <li class="nav-item">
    <a class="nav-link {{ request()->routeIs('home.*') ? 'active' : '' }}"
       href="{{ route('home') }}">
        <i class="fa-solid fa-gauge-high"></i> Dashboard
    </a>
</li>
                    @endauth

                    @guest
                        @if (Route::has('login'))
                            <li class="nav-item">
                                <a class="nav-link {{ request()->routeIs('login') ? 'active' : '' }}"
                                   href="{{ route('login') }}">
                                    <i class="fa-solid fa-right-to-bracket"></i> Login
                                </a>
                            </li>
                        @endif

                        @if (Route::has('register'))
                            <li class="nav-item">
                                <a class="nav-link {{ request()->routeIs('register') ? 'active' : '' }}"
                                   href="{{ route('register') }}">
                                    <i class="fa-solid fa-user-plus"></i> Register
                                </a>
                            </li>
                        @endif
                    @else
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                               data-bs-toggle="dropdown">
                                <i class="fa-solid fa-circle-user"></i> {{ Auth::user()->name }}
                            </a>

                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="{{ route('logout') }}"
                                   onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                                    <i class="fa-solid fa-right-from-bracket me-1"></i> Logout
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                    @csrf
                                </form>
                            </div>
                        </li>
                    @endguest

                </ul>
            </div>
        </div>
    </nav>

    <main class="py-4">
        @yield('content')
    </main>

</div>
</body>
</html>
