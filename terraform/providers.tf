provider "google" {
  project     = var.project_id
  region      = var.region
  credentials = file(var.service_account_json)
}