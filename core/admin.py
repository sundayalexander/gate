from django.contrib import admin
from django.utils.html import format_html

from core.models import Gate


# Register your models here.
@admin.register(Gate)
class GateAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'image_name', 'created_at', 'updated_at',)
    list_filter = ('created_at', 'updated_at',)
    list_display_links = ('id', 'name')
    search_fields = ('name', 'description',)

    @staticmethod
    def image_name(obj):
        return format_html('<a href="{}">{}</a>', obj.image.url, obj.image.name)
