import { useSelector } from "react-redux";


export default function ProductStep() {
const { mode } = useSelector(s => s.serviceFlowModel);


return (
<div className="p-6">
<h3 className="text-xl font-semibold">
Attach Products to {mode}
</h3>


{/* later reusable for packages */}
<div className="mt-4 text-muted-foreground">
Product selection UI here
</div>
</div>
);
}