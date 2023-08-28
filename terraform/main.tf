#TODO: Cloud Run Resource
resource "google_cloud_run_v2_service" "default" {
  name     = var.service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    scaling {
      min_instance_count = 0
      max_instance_count = 2
    }

    containers {
      ports {
        container_port = 80
      }
      image = var.image
    }

  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

}

#TODO: Create public access
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

#TODO: Enable public access on Cloud Run service
resource "google_cloud_run_v2_service_iam_policy" "noauth" {
  name        = google_cloud_run_v2_service.default.name
  location    = google_cloud_run_v2_service.default.location
  policy_data = data.google_iam_policy.noauth.policy_data
}
