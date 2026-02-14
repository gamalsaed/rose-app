import { getAllAddresses } from '@/lib/apis/address.api';
import { MapPin, Phone, Pencil, Trash2 } from 'lucide-react';
import DeleteAddressModal from './delete-address-modal';

type AddressCardProps = {
  _id: string;
  street: string;
  city: string;
  phone: string;
  onEdit?: () => void;
};

export default function AddressCard({
  street,
  city,
  phone,
  _id,
  onEdit,
}: AddressCardProps) {
  return (
    <>
      <div
        className="relative rounded-lg border p-4 pe-9 mb-9
        border-zinc-300
        hover:border-maroon-600 "
      >
        {/* Street Label */}
        <span className="absolute -top-4 left-4 bg-white px-2 text-2xl font-medium text-maroon-600">
          {street}
        </span>

        <div className="flex justify-between items-center">
          {/* City Section */}
          <div className="flex items-center gap-2">
            <div className="mt-1 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
              <MapPin className="text-white" size={16} />
            </div>
            <p className="font-semibold text-2xl text-zinc-800">{city}</p>
          </div>
          {/* Phone Section */}
          <div className="flex items-center gap-1 font-medium text-lg text-zinc-600">
            <Phone size={16} />
            <span>{phone}</span>
          </div>
        </div>
        {/* Full Address */}

        <p className="text-sm text-zinc-800 mt-4 bg-zinc-100 py-1 px-3 w-fit rounded-full">
          {`${street}, ${city}`}
        </p>
        {/* Action Buttons */}
        <div className="absolute top-1/2 -end-4 transform -translate-y-1/2 flex flex-col gap-2">
          <button
            onClick={onEdit}
            className="text-zinc-400 w-9 h-9 flex items-center justify-center rounded-full bg-zinc-50 border border-zinc-400"
          >
            <Pencil size={16} />
          </button>

          <DeleteAddressModal id={_id} />
        </div>
      </div>
    </>
  );
}
