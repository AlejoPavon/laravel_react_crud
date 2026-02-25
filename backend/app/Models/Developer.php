<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Developer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'main_stack',
        'seniority',
        'hourly_rate',
        'is_active',
        'user_id'
    ];

    protected $casts = [
        'hourly_rate' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * Get the user (company/admin) that owns this developer.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only active developers.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to filter by seniority.
     */
    public function scopeBySeniority($query, string $seniority)
    {
        return $query->where('seniority', $seniority);
    }
}