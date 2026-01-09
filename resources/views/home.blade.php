<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">

    <style>
        :root{
            --primary:#2563eb;   /* Blue */
            --success:#16a34a;   /* Green */
            --warning:#f59e0b;   /* Orange */
            --danger:#dc2626;    /* Red */
            --info:#0ea5e9;
            --dark:#0f172a;      /* Dark Navy */
            --dark-2:#020617;
            --text:#e5e7eb;
            --muted:#94a3b8;
            --bg:#f1f5f9;
        }

        body{
            background:var(--bg);
            font-family:'Segoe UI',sans-serif;
        }

        /* Sidebar */
        .sidebar{
            width:260px;
            height:100vh;
            position:fixed;
            background:linear-gradient(180deg,var(--dark),var(--dark-2));
            color:var(--text);
            display:flex;
            flex-direction:column;
            box-shadow:6px 0 30px rgba(0,0,0,.4);
        }

        .sidebar h4{
            padding:22px;
            border-bottom:1px solid #1e293b;
            font-weight:700;
            letter-spacing:1px;
        }

        .sidebar a,
        .sidebar button{
            color:var(--muted);
            padding:14px 24px;
            display:flex;
            align-items:center;
            gap:12px;
            text-decoration:none;
            font-size:15px;
            border:none;
            background:none;
            transition:.35s ease;
        }

        .sidebar a:hover,
        .sidebar button:hover{
            background:rgba(255,255,255,.05);
            color:#fff;
            padding-left:30px;
        }

        .sidebar a.active{
            background:rgba(37,99,235,.15);
            color:#fff;
            border-left:4px solid var(--primary);
        }

        .logout-btn{
            color:#f87171 !important;
        }

        /* Main */
        .main{
            margin-left:260px;
            padding:30px;
        }

        .navbar{
            border-radius:14px;
        }

        /* Cards */
        .card{
            border:none;
            border-radius:18px;
            transition:.35s ease;
            background:#fff;
        }

        .card:hover{
            transform:translateY(-6px);
            box-shadow:0 15px 35px rgba(0,0,0,.12);
        }

        .icon-box{
            width:56px;
            height:56px;
            border-radius:16px;
            display:flex;
            align-items:center;
            justify-content:center;
            color:#fff;
            font-size:20px;
            box-shadow:0 12px 22px rgba(0,0,0,.25);
        }

        .bg-primary{background:linear-gradient(135deg,#2563eb,#60a5fa);}
        .bg-success{background:linear-gradient(135deg,#16a34a,#4ade80);}
        .bg-warning{background:linear-gradient(135deg,#f59e0b,#facc15);}
        .bg-danger{background:linear-gradient(135deg,#dc2626,#f87171);}
        .bg-info{background:linear-gradient(135deg,#0ea5e9,#38bdf8);}

        h3{
            font-weight:700;
        }
    </style>
</head>
<body>

<!-- Sidebar -->
<div class="sidebar">
    <h4 class="text-center">Admin Panel</h4>

    <a href="#" class="active">
        <i class="fa-solid fa-gauge-high"></i> Dashboard
    </a>

    <a href="{{ route('users.index') }}">
        <i class="fa-solid fa-user-group"></i> Users
    </a>

    <a href="{{ route('categories.index') }}">
        <i class="fa-solid fa-layer-group"></i> Categories
    </a>

    <a href="{{ route('technicians.index') }}">
        <i class="fa-solid fa-user-gear"></i> Technicians
    </a>

    <a href="{{ route('services.index') }}">
        <i class="fa-solid fa-screwdriver-wrench"></i> Services
    </a>

    <a href="{{ route('service_requests.index') }}">
        <i class="fa-solid fa-file-circle-check"></i> Service Requests
    </a>

    <a href="{{ route('reviews.index') }}">
        <i class="fa-solid fa-star-half-stroke"></i> Reviews
    </a>

    <div class="mt-auto">
        <form action="{{ route('logout') }}" method="POST">
            @csrf
            <button type="submit" class="logout-btn">
                <i class="fa-solid fa-right-from-bracket"></i> Logout
            </button>
        </form>
    </div>
</div>

<!-- Main -->
<div class="main">

    <nav class="navbar bg-white shadow-sm mb-4 px-4 py-3">
        <span class="fw-bold fs-5">Dashboard Overview</span>
        <span class="text-muted">Admin</span>
    </nav>

    <div class="row g-4">

        <div class="col-md-3">
            <a href="{{ route('users.index') }}" class="text-decoration-none text-dark">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="text-muted">Users</h6>
                            <h3>{{ $users->count() }}</h3>
                        </div>
                        <div class="icon-box bg-primary">
                            <i class="fa-solid fa-user-group"></i>
                        </div>
                    </div>
                </div>
            </a>
        </div>

        <div class="col-md-3">
            <a href="{{ route('categories.index') }}" class="text-decoration-none text-dark">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="text-muted">Categories</h6>
                            <h3>{{ $categories->count() }}</h3>
                        </div>
                        <div class="icon-box bg-success">
                            <i class="fa-solid fa-layer-group"></i>
                        </div>
                    </div>
                </div>
            </a>
        </div>

        <div class="col-md-3">
            <a href="{{ route('technicians.index') }}" class="text-decoration-none text-dark">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="text-muted">Technicians</h6>
                            <h3>{{ $technicians->count() }}</h3>
                        </div>
                        <div class="icon-box bg-warning">
                            <i class="fa-solid fa-user-gear"></i>
                        </div>
                    </div>
                </div>
            </a>
        </div>

        <div class="col-md-3">
            <a href="{{ route('services.index') }}" class="text-decoration-none text-dark">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="text-muted">Services</h6>
                            <h3>{{ $services->count() }}</h3>
                        </div>
                        <div class="icon-box bg-info">
                            <i class="fa-solid fa-screwdriver-wrench"></i>
                        </div>
                    </div>
                </div>
            </a>
        </div>

        <div class="col-md-3">
            <a href="{{ route('service_requests.index') }}" class="text-decoration-none text-dark">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="text-muted">Service Requests</h6>
                            <h3>{{ $serviceRequests->count() }}</h3>
                        </div>
                        <div class="icon-box bg-danger">
                            <i class="fa-solid fa-file-circle-check"></i>
                        </div>
                    </div>
                </div>
            </a>
        </div>

        <div class="col-md-3">
            <a href="{{ route('reviews.index') }}" class="text-decoration-none text-dark">
                <div class="card p-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="text-muted ">Reviews</h6>
                            <h3>{{ $reviews->count() }}</h3>
                        </div>
                        <div class="icon-box bg-warning">
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                    </div>
                </div>
            </a>
        </div>

    </div>

</div>

</body>
</html>
