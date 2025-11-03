import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, RefreshCw } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: {
    key: string;
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }[];
  onReset?: () => void;
  placeholder?: string;
  className?: string;
  showActiveFilters?: boolean;
}

export function SearchFilter({
  searchValue,
  onSearchChange,
  filters = [],
  onReset,
  placeholder = "Cari...",
  className = "",
  showActiveFilters = true
}: SearchFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFiltersCount = filters.filter(f => f.value !== "all" && f.value !== "").length;
  const hasActiveSearch = searchValue.trim().length > 0;
  const hasActiveFilters = activeFiltersCount > 0 || hasActiveSearch;

  const handleReset = () => {
    onSearchChange("");
    filters.forEach(filter => filter.onChange("all"));
    onReset?.();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {hasActiveSearch && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange("")}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {filters.length > 0 && (
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`gap-2 ${activeFiltersCount > 0 ? 'border-blue-500 text-blue-600' : ''}`}
          >
            <Filter className="h-4 w-4" />
            Filter
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        )}

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleReset}
            className="gap-2 text-gray-600"
          >
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      {/* Filters */}
      {filters.length > 0 && isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border">
          {filters.map((filter) => (
            <div key={filter.key} className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {filter.label}
              </label>
              <Select value={filter.value} onValueChange={filter.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua {filter.label}</SelectItem>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{option.label}</span>
                        {option.count !== undefined && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {option.count}
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}

      {/* Active Filters Display */}
      {showActiveFilters && hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {hasActiveSearch && (
            <Badge variant="outline" className="gap-1">
              <Search className="h-3 w-3" />
              "{searchValue}"
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSearchChange("")}
                className="h-4 w-4 p-0 ml-1"
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}
          
          {filters
            .filter(f => f.value !== "all" && f.value !== "")
            .map((filter) => {
              const selectedOption = filter.options.find(opt => opt.value === filter.value);
              return (
                <Badge key={filter.key} variant="outline" className="gap-1">
                  <Filter className="h-3 w-3" />
                  {filter.label}: {selectedOption?.label || filter.value}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => filter.onChange("all")}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              );
            })}
        </div>
      )}
    </div>
  );
}

// Hook untuk search dan filter
export function useSearchFilter<T>(
  data: T[] | undefined,
  searchFields: (keyof T)[],
  initialFilters: Record<string, string> = {}
) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(initialFilters);

  const filteredData = data?.filter((item) => {
    // Search filter
    const matchesSearch = searchFields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });

    // Other filters
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (value === "all" || value === "") return true;
      
      const itemValue = item[key as keyof T];
      if (typeof itemValue === 'boolean') {
        return (value === "active" && itemValue) || (value === "inactive" && !itemValue);
      }
      return itemValue === value;
    });

    return (!searchTerm || matchesSearch) && matchesFilters;
  }) || [];

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters(initialFilters);
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    resetFilters,
    filteredData,
    hasActiveFilters: searchTerm.length > 0 || Object.values(filters).some(v => v !== "all" && v !== "")
  };
}