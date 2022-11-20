import lightGallery from "https://cdn.skypack.dev/lightgallery@2.0.0-beta.3";

import lgZoom from "https://cdn.skypack.dev/lightgallery@2.0.0-beta.3/plugins/zoom";

import lgShare from "https://cdn.skypack.dev/lightgallery@2.0.0-beta.3/plugins/share";

import lgHash from "https://cdn.skypack.dev/lightgallery@2.0.0-beta.3/plugins/hash";

lightGallery(document.getElementById("gallery-container"), {
  speed: 500,
  plugins: [lgZoom, lgShare, lgHash] });