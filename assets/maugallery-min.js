(function (a) {
  a.fn.mauGallery = function (b) {
    b = a.extend(a.fn.mauGallery.defaults, b);
    var c = [];
    return this.each(function () {
      a.fn.mauGallery.methods.createRowWrapper(a(this));
      b.lightBox &&
        a.fn.mauGallery.methods.createLightBox(
          a(this),
          b.lightboxId,
          b.navigation
        );
      a.fn.mauGallery.listeners(b);
      a(this)
        .children(".gallery-item")
        .each(function (d) {
          a.fn.mauGallery.methods.responsiveImageItem(a(this));
          a.fn.mauGallery.methods.moveItemInRowWrapper(a(this));
          a.fn.mauGallery.methods.wrapItemInColumn(a(this), b.columns);
          var e = a(this).data("gallery-tag");
          b.showTags && void 0 !== e && -1 === c.indexOf(e) && c.push(e);
        });
      b.showTags &&
        a.fn.mauGallery.methods.showItemTags(a(this), b.tagsPosition, c);
      a(this).fadeIn(500);
    });
  };
  a.fn.mauGallery.defaults = {
    columns: 3,
    lightBox: !0,
    lightboxId: null,
    showTags: !0,
    tagsPosition: "bottom",
    navigation: !0,
  };
  a.fn.mauGallery.listeners = function (b) {
    a(".gallery-item").on("click", function () {
      b.lightBox && "IMG" === a(this).prop("tagName")
        ? a.fn.mauGallery.methods.openLightBox(a(this), b.lightboxId)
        : void 0;
    });
    a(".gallery").on("click", ".nav-link", a.fn.mauGallery.methods.filterByTag);
    a(".gallery").on("click", ".mg-prev", function () {
      a.fn.mauGallery.methods.prevImage(b.lightboxId);
    });
    a(".gallery").on("click", ".mg-next", function () {
      a.fn.mauGallery.methods.nextImage(b.lightboxId);
    });
  };
  a.fn.mauGallery.methods = {
    createRowWrapper: function (b) {
      b.children().first().hasClass("row") ||
        b.append('<div class="gallery-items-row row"></div>');
    },
    wrapItemInColumn: function (b, c) {
      if ("number" === typeof c)
        b.wrap(
          "<div class='item-column mb-4 col-" + Math.ceil(12 / c) + "'></div>"
        );
      else if ("object" === typeof c) {
        var d = "";
        c.xs && (d += " col-" + Math.ceil(12 / c.xs));
        c.sm && (d += " col-sm-" + Math.ceil(12 / c.sm));
        c.md && (d += " col-md-" + Math.ceil(12 / c.md));
        c.lg && (d += " col-lg-" + Math.ceil(12 / c.lg));
        c.xl && (d += " col-xl-" + Math.ceil(12 / c.xl));
        b.wrap("<div class='item-column mb-4" + d + "'></div>");
      } else
        console.error(
          "Columns should be defined as numbers or objects. " +
            typeof c +
            " is not supported."
        );
    },
    moveItemInRowWrapper: function (b) {
      b.appendTo(".gallery-items-row");
    },
    responsiveImageItem: function (b) {
      "IMG" === b.prop("tagName") && b.addClass("img-fluid");
    },
    openLightBox: function (b, c) {
      a("#" + c)
        .find(".lightboxImage")
        .attr("src", b.attr("src"));
      a("#" + c).modal("toggle");
    },
    prevImage: function () {
      var b = null;
      a("img.gallery-item").each(function () {
        a(this).attr("src") === a(".lightboxImage").attr("src") &&
          (b = a(this));
      });
      var c = a(".tags-bar span.active-tag").data("images-toggle"),
        d = [];
      "all" === c
        ? a(".item-column").each(function () {
            a(this).children("img").length && d.push(a(this).children("img"));
          })
        : a(".item-column").each(function () {
            a(this).children("img").data("gallery-tag") === c &&
              d.push(a(this).children("img"));
          });
      var e = 0,
        f = null;
      a(d).each(function (c) {
        a(b).attr("src") === a(this).attr("src") && (e = c - 1);
      });
      f = d[e] || d[d.length - 1];
      a(".lightboxImage").attr("src", a(f).attr("src"));
    },
    nextImage: function () {
      var b = null;
      a("img.gallery-item").each(function () {
        a(this).attr("src") === a(".lightboxImage").attr("src") &&
          (b = a(this));
      });
      var c = a(".tags-bar span.active-tag").data("images-toggle"),
        d = [];
      "all" === c
        ? a(".item-column").each(function () {
            a(this).children("img").length && d.push(a(this).children("img"));
          })
        : a(".item-column").each(function () {
            a(this).children("img").data("gallery-tag") === c &&
              d.push(a(this).children("img"));
          });
      var e = 0,
        f = null;
      a(d).each(function (c) {
        a(b).attr("src") === a(this).attr("src") && (e = c + 1);
      });
      f = d[e] || d[0];
      a(".lightboxImage").attr("src", a(f).attr("src"));
    },
    createLightBox: function (b, c, d) {
      b.append(
        '<div class="modal fade" id="' +
          (c ? c : "galleryLightbox") +
          '" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body">' +
          (d
            ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
            : '<span style="display:none;" />') +
          '<img class="lightboxImage img-fluid" alt="Contenu de l\'image affichée dans la modale au clique"/>' +
          (d
            ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
            : '<span style="display:none;" />') +
          "</div></div></div></div>"
      );
    },
    showItemTags: function (b, c, d) {
      var e =
        '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';
      a.each(d, function (a, b) {
        e +=
          '<li class="nav-item active"><span class="nav-link"  data-images-toggle="' +
          b +
          '">' +
          b +
          "</span></li>";
      });
      var f = '<ul class="my-4 tags-bar nav nav-pills">' + e + "</ul>";
      "bottom" === c
        ? b.append(f)
        : "top" === c
        ? b.prepend(f)
        : console.error("Unknown tags position: " + c);
    },
    filterByTag: function () {
      a(this).hasClass("active-tag") ||
        (a(".active.active-tag").removeClass("active active-tag"),
        a(this).addClass("active-tag active"),
        a(".gallery-item").each(function () {
          a(this).parents(".item-column").hide();
          var b = a(this).data("images-toggle");
          "all" === b
            ? a(this).parents(".item-column").show(300)
            : a(this).data("gallery-tag") === b &&
              a(this).parents(".item-column").show(300);
        }));
    },
  };
})(jQuery);
