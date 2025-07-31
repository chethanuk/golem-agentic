impl<'js> rquickjs::IntoJs<'js> for crate::bindings::wasi::clocks::wall_clock::Datetime {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let seconds: u64 = self.seconds;
        obj.set("seconds", seconds)?;
        let nanoseconds: u32 = self.nanoseconds;
        obj.set("nanoseconds", nanoseconds)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::wasi::clocks::wall_clock::Datetime {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let seconds: u64 = obj.get("seconds")?;
        let seconds: u64 = seconds;
        let nanoseconds: u32 = obj.get("nanoseconds")?;
        let nanoseconds: u32 = nanoseconds;
        Ok(Self {
            seconds,
            nanoseconds,
        })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::rpc::types::Uuid {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let high_bits: u64 = self.high_bits;
        obj.set("highBits", high_bits)?;
        let low_bits: u64 = self.low_bits;
        obj.set("lowBits", low_bits)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::rpc::types::Uuid {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let high_bits: u64 = obj.get("highBits")?;
        let high_bits: u64 = high_bits;
        let low_bits: u64 = obj.get("lowBits")?;
        let low_bits: u64 = low_bits;
        Ok(Self {
            high_bits,
            low_bits,
        })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::rpc::types::ComponentId {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let uuid: crate::bindings::golem::rpc::types::Uuid = self.uuid;
        obj.set("uuid", uuid)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::rpc::types::ComponentId {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let uuid: crate::bindings::golem::rpc::types::Uuid = obj.get("uuid")?;
        let uuid: crate::bindings::golem::rpc::types::Uuid = uuid;
        Ok(Self { uuid })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::rpc::types::WorkerId {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let component_id: crate::bindings::golem::rpc::types::ComponentId = self.component_id;
        obj.set("componentId", component_id)?;
        let worker_name: String = self.worker_name;
        obj.set("workerName", worker_name)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::rpc::types::WorkerId {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let component_id: crate::bindings::golem::rpc::types::ComponentId =
            obj.get("componentId")?;
        let component_id: crate::bindings::golem::rpc::types::ComponentId = component_id;
        let worker_name: String = obj.get("workerName")?;
        let worker_name: String = worker_name;
        Ok(Self {
            component_id,
            worker_name,
        })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::rpc::types::ResourceMode {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        match self {
            crate::bindings::golem::rpc::types::ResourceMode::Owned => "owned".into_js(ctx),
            crate::bindings::golem::rpc::types::ResourceMode::Borrowed => "borrowed".into_js(ctx),
        }
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::rpc::types::ResourceMode {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let value = value
            .as_string()
            .ok_or_else(|| {
                rquickjs::Error::new_from_js_message(
                    "JS resource-mode",
                    "WIT resource-mode",
                    "Expected a string",
                )
            })?
            .to_string()?;
        match value.as_str() {
            "owned" => Ok(crate::bindings::golem::rpc::types::ResourceMode::Owned),
            "borrowed" => Ok(crate::bindings::golem::rpc::types::ResourceMode::Borrowed),
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS resource-mode",
                "WIT resource-mode",
                format!("Unknown case value: {value}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::rpc::types::WitTypeNode {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        match self {
            crate::bindings::golem::rpc::types::WitTypeNode::RecordType(inner) => {
                obj.set(crate::wrappers::TAG, "record-type")?;
                let case_value: Vec<
                    rquickjs::convert::List<(
                        String,
                        crate::bindings::golem::rpc::types::NodeIndex,
                    )>,
                > = inner
                    .into_iter()
                    .map(|v| rquickjs::convert::List(v))
                    .collect::<Vec<_>>();
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::VariantType(inner) => {
                obj.set(crate::wrappers::TAG, "variant-type")?;
                let case_value: Vec<
                    rquickjs::convert::List<(
                        String,
                        Option<crate::bindings::golem::rpc::types::NodeIndex>,
                    )>,
                > = inner
                    .into_iter()
                    .map(|v| rquickjs::convert::List(v))
                    .collect::<Vec<_>>();
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::EnumType(inner) => {
                obj.set(crate::wrappers::TAG, "enum-type")?;
                let case_value: Vec<String> = inner.into_iter().map(|v| v).collect::<Vec<_>>();
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::FlagsType(inner) => {
                obj.set(crate::wrappers::TAG, "flags-type")?;
                let case_value: Vec<String> = inner.into_iter().map(|v| v).collect::<Vec<_>>();
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::TupleType(inner) => {
                obj.set(crate::wrappers::TAG, "tuple-type")?;
                let case_value: Vec<i32> = inner.into_iter().map(|v| v).collect::<Vec<_>>();
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::ListType(inner) => {
                obj.set(crate::wrappers::TAG, "list-type")?;
                let case_value: i32 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::OptionType(inner) => {
                obj.set(crate::wrappers::TAG, "option-type")?;
                let case_value: i32 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::ResultType(inner) => {
                obj.set(crate::wrappers::TAG, "result-type")?;
                let case_value: rquickjs::convert::List<(
                    Option<crate::bindings::golem::rpc::types::NodeIndex>,
                    Option<crate::bindings::golem::rpc::types::NodeIndex>,
                )> = rquickjs::convert::List(inner);
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::PrimU8Type => {
                obj.set(crate::wrappers::TAG, "prim-u8-type")?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::PrimU16Type => {
                obj.set(crate::wrappers::TAG, "prim-u16-type")?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::PrimU32Type => {
                obj.set(crate::wrappers::TAG, "prim-u32-type")?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::PrimU64Type => {
                obj.set(crate::wrappers::TAG, "prim-u64-type")?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::PrimS8Type => {
                obj.set(crate::wrappers::TAG, "prim-s8-type")?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::PrimS16Type => {
                obj.set(crate::wrappers::TAG, "prim-s16-type")?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::PrimS32Type => {
                obj.set(crate::wrappers::TAG, "prim-s32-type")?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::PrimS64Type => {
                obj.set(crate::wrappers::TAG, "prim-s64-type")?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::PrimF32Type => {
                obj.set(crate::wrappers::TAG, "prim-f32-type")?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::PrimF64Type => {
                obj.set(crate::wrappers::TAG, "prim-f64-type")?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::PrimCharType => {
                obj.set(crate::wrappers::TAG, "prim-char-type")?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::PrimBoolType => {
                obj.set(crate::wrappers::TAG, "prim-bool-type")?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::PrimStringType => {
                obj.set(crate::wrappers::TAG, "prim-string-type")?;
            }
            crate::bindings::golem::rpc::types::WitTypeNode::HandleType(inner) => {
                obj.set(crate::wrappers::TAG, "handle-type")?;
                let case_value: rquickjs::convert::List<(
                    crate::bindings::golem::rpc::types::ResourceId,
                    crate::bindings::golem::rpc::types::ResourceMode,
                )> = rquickjs::convert::List(inner);
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
        }
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::rpc::types::WitTypeNode {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let tag: String = obj.get(crate::wrappers::TAG)?;
        match tag.as_str() {
            "record-type" => {
                let inner: Vec<
                    rquickjs::convert::List<(
                        String,
                        crate::bindings::golem::rpc::types::NodeIndex,
                    )>,
                > = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitTypeNode::RecordType(
                    inner.into_iter().map(|v| v.0).collect::<Vec<_>>(),
                ))
            }
            "variant-type" => {
                let inner: Vec<
                    rquickjs::convert::List<(
                        String,
                        Option<crate::bindings::golem::rpc::types::NodeIndex>,
                    )>,
                > = obj.get(crate::wrappers::VALUE)?;
                Ok(
                    crate::bindings::golem::rpc::types::WitTypeNode::VariantType(
                        inner.into_iter().map(|v| v.0).collect::<Vec<_>>(),
                    ),
                )
            }
            "enum-type" => {
                let inner: Vec<String> = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitTypeNode::EnumType(
                    inner.into_iter().map(|v| v).collect::<Vec<_>>(),
                ))
            }
            "flags-type" => {
                let inner: Vec<String> = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitTypeNode::FlagsType(
                    inner.into_iter().map(|v| v).collect::<Vec<_>>(),
                ))
            }
            "tuple-type" => {
                let inner: Vec<i32> = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitTypeNode::TupleType(
                    inner.into_iter().map(|v| v).collect::<Vec<_>>(),
                ))
            }
            "list-type" => {
                let inner: i32 = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitTypeNode::ListType(
                    inner,
                ))
            }
            "option-type" => {
                let inner: i32 = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitTypeNode::OptionType(
                    inner,
                ))
            }
            "result-type" => {
                let inner: rquickjs::convert::List<(
                    Option<crate::bindings::golem::rpc::types::NodeIndex>,
                    Option<crate::bindings::golem::rpc::types::NodeIndex>,
                )> = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitTypeNode::ResultType(
                    inner.0,
                ))
            }
            "prim-u8-type" => Ok(crate::bindings::golem::rpc::types::WitTypeNode::PrimU8Type),
            "prim-u16-type" => Ok(crate::bindings::golem::rpc::types::WitTypeNode::PrimU16Type),
            "prim-u32-type" => Ok(crate::bindings::golem::rpc::types::WitTypeNode::PrimU32Type),
            "prim-u64-type" => Ok(crate::bindings::golem::rpc::types::WitTypeNode::PrimU64Type),
            "prim-s8-type" => Ok(crate::bindings::golem::rpc::types::WitTypeNode::PrimS8Type),
            "prim-s16-type" => Ok(crate::bindings::golem::rpc::types::WitTypeNode::PrimS16Type),
            "prim-s32-type" => Ok(crate::bindings::golem::rpc::types::WitTypeNode::PrimS32Type),
            "prim-s64-type" => Ok(crate::bindings::golem::rpc::types::WitTypeNode::PrimS64Type),
            "prim-f32-type" => Ok(crate::bindings::golem::rpc::types::WitTypeNode::PrimF32Type),
            "prim-f64-type" => Ok(crate::bindings::golem::rpc::types::WitTypeNode::PrimF64Type),
            "prim-char-type" => Ok(crate::bindings::golem::rpc::types::WitTypeNode::PrimCharType),
            "prim-bool-type" => Ok(crate::bindings::golem::rpc::types::WitTypeNode::PrimBoolType),
            "prim-string-type" => {
                Ok(crate::bindings::golem::rpc::types::WitTypeNode::PrimStringType)
            }
            "handle-type" => {
                let inner: rquickjs::convert::List<(
                    crate::bindings::golem::rpc::types::ResourceId,
                    crate::bindings::golem::rpc::types::ResourceMode,
                )> = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitTypeNode::HandleType(
                    inner.0,
                ))
            }
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS wit-type-node",
                "WIT wit-type-node",
                format!("Unknown variant case: {tag}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::rpc::types::WitType {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let nodes: Vec<crate::bindings::golem::rpc::types::WitTypeNode> =
            self.nodes.into_iter().map(|v| v).collect::<Vec<_>>();
        obj.set("nodes", nodes)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::rpc::types::WitType {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let nodes: Vec<crate::bindings::golem::rpc::types::WitTypeNode> = obj.get("nodes")?;
        let nodes: Vec<crate::bindings::golem::rpc::types::WitTypeNode> =
            nodes.into_iter().map(|v| v).collect::<Vec<_>>();
        Ok(Self { nodes })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::rpc::types::Uri {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let value: String = self.value;
        obj.set("value", value)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::rpc::types::Uri {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let value: String = obj.get("value")?;
        let value: String = value;
        Ok(Self { value })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::rpc::types::WitNode {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        match self {
            crate::bindings::golem::rpc::types::WitNode::RecordValue(inner) => {
                obj.set(crate::wrappers::TAG, "record-value")?;
                let case_value: Vec<i32> = inner.into_iter().map(|v| v).collect::<Vec<_>>();
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::VariantValue(inner) => {
                obj.set(crate::wrappers::TAG, "variant-value")?;
                let case_value: rquickjs::convert::List<(
                    u32,
                    Option<crate::bindings::golem::rpc::types::NodeIndex>,
                )> = rquickjs::convert::List(inner);
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::EnumValue(inner) => {
                obj.set(crate::wrappers::TAG, "enum-value")?;
                let case_value: u32 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::FlagsValue(inner) => {
                obj.set(crate::wrappers::TAG, "flags-value")?;
                let case_value: Vec<bool> = inner.into_iter().map(|v| v).collect::<Vec<_>>();
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::TupleValue(inner) => {
                obj.set(crate::wrappers::TAG, "tuple-value")?;
                let case_value: Vec<i32> = inner.into_iter().map(|v| v).collect::<Vec<_>>();
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::ListValue(inner) => {
                obj.set(crate::wrappers::TAG, "list-value")?;
                let case_value: Vec<i32> = inner.into_iter().map(|v| v).collect::<Vec<_>>();
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::OptionValue(inner) => {
                obj.set(crate::wrappers::TAG, "option-value")?;
                let case_value: Option<i32> = inner.map(|v| v);
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::ResultValue(inner) => {
                obj.set(crate::wrappers::TAG, "result-value")?;
                let case_value: crate::wrappers::JsResult<Option<i32>, Option<i32>> =
                    crate::wrappers::JsResult(match inner {
                        Ok(v) => Ok(v.map(|v| v)),
                        Err(v) => Err(v.map(|v| v)),
                    });
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::PrimU8(inner) => {
                obj.set(crate::wrappers::TAG, "prim-u8")?;
                let case_value: u8 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::PrimU16(inner) => {
                obj.set(crate::wrappers::TAG, "prim-u16")?;
                let case_value: u16 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::PrimU32(inner) => {
                obj.set(crate::wrappers::TAG, "prim-u32")?;
                let case_value: u32 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::PrimU64(inner) => {
                obj.set(crate::wrappers::TAG, "prim-u64")?;
                let case_value: u64 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::PrimS8(inner) => {
                obj.set(crate::wrappers::TAG, "prim-s8")?;
                let case_value: i8 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::PrimS16(inner) => {
                obj.set(crate::wrappers::TAG, "prim-s16")?;
                let case_value: i16 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::PrimS32(inner) => {
                obj.set(crate::wrappers::TAG, "prim-s32")?;
                let case_value: i32 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::PrimS64(inner) => {
                obj.set(crate::wrappers::TAG, "prim-s64")?;
                let case_value: i64 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::PrimFloat32(inner) => {
                obj.set(crate::wrappers::TAG, "prim-float32")?;
                let case_value: f32 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::PrimFloat64(inner) => {
                obj.set(crate::wrappers::TAG, "prim-float64")?;
                let case_value: f64 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::PrimChar(inner) => {
                obj.set(crate::wrappers::TAG, "prim-char")?;
                let case_value: char = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::PrimBool(inner) => {
                obj.set(crate::wrappers::TAG, "prim-bool")?;
                let case_value: bool = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::PrimString(inner) => {
                obj.set(crate::wrappers::TAG, "prim-string")?;
                let case_value: String = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::WitNode::Handle(inner) => {
                obj.set(crate::wrappers::TAG, "handle")?;
                let case_value: rquickjs::convert::List<(
                    crate::bindings::golem::rpc::types::Uri,
                    u64,
                )> = rquickjs::convert::List(inner);
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
        }
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::rpc::types::WitNode {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let tag: String = obj.get(crate::wrappers::TAG)?;
        match tag.as_str() {
            "record-value" => {
                let inner: Vec<i32> = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::RecordValue(
                    inner.into_iter().map(|v| v).collect::<Vec<_>>(),
                ))
            }
            "variant-value" => {
                let inner: rquickjs::convert::List<(
                    u32,
                    Option<crate::bindings::golem::rpc::types::NodeIndex>,
                )> = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::VariantValue(
                    inner.0,
                ))
            }
            "enum-value" => {
                let inner: u32 = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::EnumValue(
                    inner,
                ))
            }
            "flags-value" => {
                let inner: Vec<bool> = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::FlagsValue(
                    inner.into_iter().map(|v| v).collect::<Vec<_>>(),
                ))
            }
            "tuple-value" => {
                let inner: Vec<i32> = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::TupleValue(
                    inner.into_iter().map(|v| v).collect::<Vec<_>>(),
                ))
            }
            "list-value" => {
                let inner: Vec<i32> = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::ListValue(
                    inner.into_iter().map(|v| v).collect::<Vec<_>>(),
                ))
            }
            "option-value" => {
                let inner: Option<i32> = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::OptionValue(
                    inner.map(|v| v),
                ))
            }
            "result-value" => {
                let inner: crate::wrappers::JsResult<Option<i32>, Option<i32>> =
                    obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::ResultValue(
                    inner.0,
                ))
            }
            "prim-u8" => {
                let inner: u8 = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::PrimU8(inner))
            }
            "prim-u16" => {
                let inner: u16 = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::PrimU16(inner))
            }
            "prim-u32" => {
                let inner: u32 = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::PrimU32(inner))
            }
            "prim-u64" => {
                let inner: u64 = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::PrimU64(inner))
            }
            "prim-s8" => {
                let inner: i8 = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::PrimS8(inner))
            }
            "prim-s16" => {
                let inner: i16 = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::PrimS16(inner))
            }
            "prim-s32" => {
                let inner: i32 = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::PrimS32(inner))
            }
            "prim-s64" => {
                let inner: i64 = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::PrimS64(inner))
            }
            "prim-float32" => {
                let inner: f32 = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::PrimFloat32(
                    inner,
                ))
            }
            "prim-float64" => {
                let inner: f64 = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::PrimFloat64(
                    inner,
                ))
            }
            "prim-char" => {
                let inner: char = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::PrimChar(inner))
            }
            "prim-bool" => {
                let inner: bool = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::PrimBool(inner))
            }
            "prim-string" => {
                let inner: String = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::PrimString(
                    inner,
                ))
            }
            "handle" => {
                let inner: rquickjs::convert::List<(crate::bindings::golem::rpc::types::Uri, u64)> =
                    obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::WitNode::Handle(inner.0))
            }
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS wit-node",
                "WIT wit-node",
                format!("Unknown variant case: {tag}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::rpc::types::WitValue {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let nodes: Vec<crate::bindings::golem::rpc::types::WitNode> =
            self.nodes.into_iter().map(|v| v).collect::<Vec<_>>();
        obj.set("nodes", nodes)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::rpc::types::WitValue {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let nodes: Vec<crate::bindings::golem::rpc::types::WitNode> = obj.get("nodes")?;
        let nodes: Vec<crate::bindings::golem::rpc::types::WitNode> =
            nodes.into_iter().map(|v| v).collect::<Vec<_>>();
        Ok(Self { nodes })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::rpc::types::ValueAndType {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let value: crate::bindings::golem::rpc::types::WitValue = self.value;
        obj.set("value", value)?;
        let typ: crate::bindings::golem::rpc::types::WitType = self.typ;
        obj.set("typ", typ)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::rpc::types::ValueAndType {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let value: crate::bindings::golem::rpc::types::WitValue = obj.get("value")?;
        let value: crate::bindings::golem::rpc::types::WitValue = value;
        let typ: crate::bindings::golem::rpc::types::WitType = obj.get("typ")?;
        let typ: crate::bindings::golem::rpc::types::WitType = typ;
        Ok(Self { value, typ })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::rpc::types::RpcError {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        match self {
            crate::bindings::golem::rpc::types::RpcError::ProtocolError(inner) => {
                obj.set(crate::wrappers::TAG, "protocol-error")?;
                let case_value: String = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::RpcError::Denied(inner) => {
                obj.set(crate::wrappers::TAG, "denied")?;
                let case_value: String = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::RpcError::NotFound(inner) => {
                obj.set(crate::wrappers::TAG, "not-found")?;
                let case_value: String = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::rpc::types::RpcError::RemoteInternalError(inner) => {
                obj.set(crate::wrappers::TAG, "remote-internal-error")?;
                let case_value: String = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
        }
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::rpc::types::RpcError {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let tag: String = obj.get(crate::wrappers::TAG)?;
        match tag.as_str() {
            "protocol-error" => {
                let inner: String = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::RpcError::ProtocolError(
                    inner,
                ))
            }
            "denied" => {
                let inner: String = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::RpcError::Denied(inner))
            }
            "not-found" => {
                let inner: String = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::RpcError::NotFound(
                    inner,
                ))
            }
            "remote-internal-error" => {
                let inner: String = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::rpc::types::RpcError::RemoteInternalError(inner))
            }
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS rpc-error",
                "WIT rpc-error",
                format!("Unknown variant case: {tag}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::agent::common::TextType {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let language_code: String = self.language_code;
        obj.set("languageCode", language_code)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::agent::common::TextType {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let language_code: String = obj.get("languageCode")?;
        let language_code: String = language_code;
        Ok(Self { language_code })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::agent::common::ParameterType {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        match self {
            crate::bindings::golem::agent::common::ParameterType::Wit(inner) => {
                obj.set(crate::wrappers::TAG, "wit")?;
                let case_value: crate::bindings::golem::rpc::types::WitType = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::agent::common::ParameterType::Text(inner) => {
                obj.set(crate::wrappers::TAG, "text")?;
                let case_value: crate::bindings::golem::agent::common::TextType = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
        }
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::agent::common::ParameterType {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let tag: String = obj.get(crate::wrappers::TAG)?;
        match tag.as_str() {
            "wit" => {
                let inner: crate::bindings::golem::rpc::types::WitType =
                    obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::agent::common::ParameterType::Wit(
                    inner,
                ))
            }
            "text" => {
                let inner: crate::bindings::golem::agent::common::TextType =
                    obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::agent::common::ParameterType::Text(
                    inner,
                ))
            }
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS parameter-type",
                "WIT parameter-type",
                format!("Unknown variant case: {tag}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::agent::common::Structured {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let parameters: Vec<crate::bindings::golem::agent::common::ParameterType> =
            self.parameters.into_iter().map(|v| v).collect::<Vec<_>>();
        obj.set("parameters", parameters)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::agent::common::Structured {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let parameters: Vec<crate::bindings::golem::agent::common::ParameterType> =
            obj.get("parameters")?;
        let parameters: Vec<crate::bindings::golem::agent::common::ParameterType> =
            parameters.into_iter().map(|v| v).collect::<Vec<_>>();
        Ok(Self { parameters })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::agent::common::Multimodal {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let text: Option<Vec<crate::bindings::golem::agent::common::TextType>> = self
            .text
            .map(|v| v.into_iter().map(|v| v).collect::<Vec<_>>());
        obj.set("text", text)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::agent::common::Multimodal {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let text: Option<Vec<crate::bindings::golem::agent::common::TextType>> = obj.get("text")?;
        let text: Option<Vec<crate::bindings::golem::agent::common::TextType>> =
            text.map(|v| v.into_iter().map(|v| v).collect::<Vec<_>>());
        Ok(Self { text })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::agent::common::DataSchema {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        match self {
            crate::bindings::golem::agent::common::DataSchema::Structured(inner) => {
                obj.set(crate::wrappers::TAG, "structured")?;
                let case_value: crate::bindings::golem::agent::common::Structured = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::agent::common::DataSchema::Multimodal(inner) => {
                obj.set(crate::wrappers::TAG, "multimodal")?;
                let case_value: crate::bindings::golem::agent::common::Multimodal = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
        }
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::agent::common::DataSchema {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let tag: String = obj.get(crate::wrappers::TAG)?;
        match tag.as_str() {
            "structured" => {
                let inner: crate::bindings::golem::agent::common::Structured =
                    obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::agent::common::DataSchema::Structured(inner))
            }
            "multimodal" => {
                let inner: crate::bindings::golem::agent::common::Multimodal =
                    obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::agent::common::DataSchema::Multimodal(inner))
            }
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS data-schema",
                "WIT data-schema",
                format!("Unknown variant case: {tag}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::agent::common::AgentConstructor {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let name: Option<String> = self.name.map(|v| v);
        obj.set("name", name)?;
        let description: String = self.description;
        obj.set("description", description)?;
        let prompt_hint: Option<String> = self.prompt_hint.map(|v| v);
        obj.set("promptHint", prompt_hint)?;
        let input_schema: crate::bindings::golem::agent::common::DataSchema = self.input_schema;
        obj.set("inputSchema", input_schema)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::agent::common::AgentConstructor {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let name: Option<String> = obj.get("name")?;
        let name: Option<String> = name.map(|v| v);
        let description: String = obj.get("description")?;
        let description: String = description;
        let prompt_hint: Option<String> = obj.get("promptHint")?;
        let prompt_hint: Option<String> = prompt_hint.map(|v| v);
        let input_schema: crate::bindings::golem::agent::common::DataSchema =
            obj.get("inputSchema")?;
        let input_schema: crate::bindings::golem::agent::common::DataSchema = input_schema;
        Ok(Self {
            name,
            description,
            prompt_hint,
            input_schema,
        })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::agent::common::AgentMethod {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let name: String = self.name;
        obj.set("name", name)?;
        let description: String = self.description;
        obj.set("description", description)?;
        let prompt_hint: Option<String> = self.prompt_hint.map(|v| v);
        obj.set("promptHint", prompt_hint)?;
        let input_schema: crate::bindings::golem::agent::common::DataSchema = self.input_schema;
        obj.set("inputSchema", input_schema)?;
        let output_schema: crate::bindings::golem::agent::common::DataSchema = self.output_schema;
        obj.set("outputSchema", output_schema)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::agent::common::AgentMethod {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let name: String = obj.get("name")?;
        let name: String = name;
        let description: String = obj.get("description")?;
        let description: String = description;
        let prompt_hint: Option<String> = obj.get("promptHint")?;
        let prompt_hint: Option<String> = prompt_hint.map(|v| v);
        let input_schema: crate::bindings::golem::agent::common::DataSchema =
            obj.get("inputSchema")?;
        let input_schema: crate::bindings::golem::agent::common::DataSchema = input_schema;
        let output_schema: crate::bindings::golem::agent::common::DataSchema =
            obj.get("outputSchema")?;
        let output_schema: crate::bindings::golem::agent::common::DataSchema = output_schema;
        Ok(Self {
            name,
            description,
            prompt_hint,
            input_schema,
            output_schema,
        })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::agent::common::AgentDependency {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let agent_name: String = self.agent_name;
        obj.set("agentName", agent_name)?;
        let methods: Vec<crate::bindings::golem::agent::common::AgentMethod> =
            self.methods.into_iter().map(|v| v).collect::<Vec<_>>();
        obj.set("methods", methods)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::agent::common::AgentDependency {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let agent_name: String = obj.get("agentName")?;
        let agent_name: String = agent_name;
        let methods: Vec<crate::bindings::golem::agent::common::AgentMethod> =
            obj.get("methods")?;
        let methods: Vec<crate::bindings::golem::agent::common::AgentMethod> =
            methods.into_iter().map(|v| v).collect::<Vec<_>>();
        Ok(Self {
            agent_name,
            methods,
        })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::agent::common::AgentType {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let type_name: String = self.type_name;
        obj.set("typeName", type_name)?;
        let description: String = self.description;
        obj.set("description", description)?;
        let agent_constructor: crate::bindings::golem::agent::common::AgentConstructor =
            self.agent_constructor;
        obj.set("agentConstructor", agent_constructor)?;
        let methods: Vec<crate::bindings::golem::agent::common::AgentMethod> =
            self.methods.into_iter().map(|v| v).collect::<Vec<_>>();
        obj.set("methods", methods)?;
        let requires: Vec<crate::bindings::golem::agent::common::AgentDependency> =
            self.requires.into_iter().map(|v| v).collect::<Vec<_>>();
        obj.set("requires", requires)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::agent::common::AgentType {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let type_name: String = obj.get("typeName")?;
        let type_name: String = type_name;
        let description: String = obj.get("description")?;
        let description: String = description;
        let agent_constructor: crate::bindings::golem::agent::common::AgentConstructor =
            obj.get("agentConstructor")?;
        let agent_constructor: crate::bindings::golem::agent::common::AgentConstructor =
            agent_constructor;
        let methods: Vec<crate::bindings::golem::agent::common::AgentMethod> =
            obj.get("methods")?;
        let methods: Vec<crate::bindings::golem::agent::common::AgentMethod> =
            methods.into_iter().map(|v| v).collect::<Vec<_>>();
        let requires: Vec<crate::bindings::golem::agent::common::AgentDependency> =
            obj.get("requires")?;
        let requires: Vec<crate::bindings::golem::agent::common::AgentDependency> =
            requires.into_iter().map(|v| v).collect::<Vec<_>>();
        Ok(Self {
            type_name,
            description,
            agent_constructor,
            methods,
            requires,
        })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::agent::common::ProgressCounter {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let steps: u32 = self.steps;
        obj.set("steps", steps)?;
        let total: u32 = self.total;
        obj.set("total", total)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::agent::common::ProgressCounter {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let steps: u32 = obj.get("steps")?;
        let steps: u32 = steps;
        let total: u32 = obj.get("total")?;
        let total: u32 = total;
        Ok(Self { steps, total })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::agent::common::ProgressReport {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let description: String = self.description;
        obj.set("description", description)?;
        let counter: Option<crate::bindings::golem::agent::common::ProgressCounter> =
            self.counter.map(|v| v);
        obj.set("counter", counter)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::agent::common::ProgressReport {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let description: String = obj.get("description")?;
        let description: String = description;
        let counter: Option<crate::bindings::golem::agent::common::ProgressCounter> =
            obj.get("counter")?;
        let counter: Option<crate::bindings::golem::agent::common::ProgressCounter> =
            counter.map(|v| v);
        Ok(Self {
            description,
            counter,
        })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::agent::common::Error {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        match self {
            crate::bindings::golem::agent::common::Error::NetworkError => {
                obj.set(crate::wrappers::TAG, "network-error")?;
            }
        }
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::agent::common::Error {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let tag: String = obj.get(crate::wrappers::TAG)?;
        match tag.as_str() {
            "network-error" => Ok(crate::bindings::golem::agent::common::Error::NetworkError),
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS error",
                "WIT error",
                format!("Unknown variant case: {tag}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::agent::common::StatusUpdate {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        match self {
            crate::bindings::golem::agent::common::StatusUpdate::Error(inner) => {
                obj.set(crate::wrappers::TAG, "error")?;
                let case_value: crate::bindings::golem::agent::common::Error = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::agent::common::StatusUpdate::Progress(inner) => {
                obj.set(crate::wrappers::TAG, "progress")?;
                let case_value: Option<crate::bindings::golem::agent::common::ProgressReport> =
                    inner.map(|v| v);
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::agent::common::StatusUpdate::Emit(inner) => {
                obj.set(crate::wrappers::TAG, "emit")?;
                let case_value: String = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
        }
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::agent::common::StatusUpdate {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let tag: String = obj.get(crate::wrappers::TAG)?;
        match tag.as_str() {
            "error" => {
                let inner: crate::bindings::golem::agent::common::Error =
                    obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::agent::common::StatusUpdate::Error(
                    inner,
                ))
            }
            "progress" => {
                let inner: Option<crate::bindings::golem::agent::common::ProgressReport> =
                    obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::agent::common::StatusUpdate::Progress(inner.map(|v| v)))
            }
            "emit" => {
                let inner: String = obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::agent::common::StatusUpdate::Emit(
                    inner,
                ))
            }
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS status-update",
                "WIT status-update",
                format!("Unknown variant case: {tag}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::exports::golem::agent::guest::AgentRef {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let agent_id: String = self.agent_id;
        obj.set("agentId", agent_id)?;
        let agent_name: String = self.agent_name;
        obj.set("agentName", agent_name)?;
        let agent_handle: u32 = self.agent_handle;
        obj.set("agentHandle", agent_handle)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::exports::golem::agent::guest::AgentRef {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let agent_id: String = obj.get("agentId")?;
        let agent_id: String = agent_id;
        let agent_name: String = obj.get("agentName")?;
        let agent_name: String = agent_name;
        let agent_handle: u32 = obj.get("agentHandle")?;
        let agent_handle: u32 = agent_handle;
        Ok(Self {
            agent_id,
            agent_name,
            agent_handle,
        })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::PromiseId {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let worker_id: crate::bindings::golem::rpc::types::WorkerId = self.worker_id;
        obj.set("workerId", worker_id)?;
        let oplog_idx: u64 = self.oplog_idx;
        obj.set("oplogIdx", oplog_idx)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::PromiseId {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let worker_id: crate::bindings::golem::rpc::types::WorkerId = obj.get("workerId")?;
        let worker_id: crate::bindings::golem::api::host::WorkerId = worker_id;
        let oplog_idx: u64 = obj.get("oplogIdx")?;
        let oplog_idx: crate::bindings::golem::api::host::OplogIndex = oplog_idx;
        Ok(Self {
            worker_id,
            oplog_idx,
        })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::RetryPolicy {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let max_attempts: u32 = self.max_attempts;
        obj.set("maxAttempts", max_attempts)?;
        let min_delay: u64 = self.min_delay;
        obj.set("minDelay", min_delay)?;
        let max_delay: u64 = self.max_delay;
        obj.set("maxDelay", max_delay)?;
        let multiplier: f64 = self.multiplier;
        obj.set("multiplier", multiplier)?;
        let max_jitter_factor: Option<f64> = self.max_jitter_factor.map(|v| v);
        obj.set("maxJitterFactor", max_jitter_factor)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::RetryPolicy {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let max_attempts: u32 = obj.get("maxAttempts")?;
        let max_attempts: u32 = max_attempts;
        let min_delay: u64 = obj.get("minDelay")?;
        let min_delay: crate::bindings::golem::api::host::Duration = min_delay;
        let max_delay: u64 = obj.get("maxDelay")?;
        let max_delay: crate::bindings::golem::api::host::Duration = max_delay;
        let multiplier: f64 = obj.get("multiplier")?;
        let multiplier: f64 = multiplier;
        let max_jitter_factor: Option<f64> = obj.get("maxJitterFactor")?;
        let max_jitter_factor: Option<f64> = max_jitter_factor.map(|v| v);
        Ok(Self {
            max_attempts,
            min_delay,
            max_delay,
            multiplier,
            max_jitter_factor,
        })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::PersistenceLevel {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        match self {
            crate::bindings::golem::api::host::PersistenceLevel::PersistNothing => {
                obj.set(crate::wrappers::TAG, "persist-nothing")?;
            }
            crate::bindings::golem::api::host::PersistenceLevel::PersistRemoteSideEffects => {
                obj.set(crate::wrappers::TAG, "persist-remote-side-effects")?;
            }
            crate::bindings::golem::api::host::PersistenceLevel::Smart => {
                obj.set(crate::wrappers::TAG, "smart")?;
            }
        }
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::PersistenceLevel {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let tag: String = obj.get(crate::wrappers::TAG)?;
        match tag.as_str() {
            "persist-nothing" => {
                Ok(crate::bindings::golem::api::host::PersistenceLevel::PersistNothing)
            }
            "persist-remote-side-effects" => {
                Ok(crate::bindings::golem::api::host::PersistenceLevel::PersistRemoteSideEffects)
            }
            "smart" => Ok(crate::bindings::golem::api::host::PersistenceLevel::Smart),
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS persistence-level",
                "WIT persistence-level",
                format!("Unknown variant case: {tag}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::UpdateMode {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        match self {
            crate::bindings::golem::api::host::UpdateMode::Automatic => "automatic".into_js(ctx),
            crate::bindings::golem::api::host::UpdateMode::SnapshotBased => {
                "snapshot-based".into_js(ctx)
            }
        }
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::UpdateMode {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let value = value
            .as_string()
            .ok_or_else(|| {
                rquickjs::Error::new_from_js_message(
                    "JS update-mode",
                    "WIT update-mode",
                    "Expected a string",
                )
            })?
            .to_string()?;
        match value.as_str() {
            "automatic" => Ok(crate::bindings::golem::api::host::UpdateMode::Automatic),
            "snapshot-based" => Ok(crate::bindings::golem::api::host::UpdateMode::SnapshotBased),
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS update-mode",
                "WIT update-mode",
                format!("Unknown case value: {value}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::FilterComparator {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        match self {
            crate::bindings::golem::api::host::FilterComparator::Equal => "equal".into_js(ctx),
            crate::bindings::golem::api::host::FilterComparator::NotEqual => {
                "not-equal".into_js(ctx)
            }
            crate::bindings::golem::api::host::FilterComparator::GreaterEqual => {
                "greater-equal".into_js(ctx)
            }
            crate::bindings::golem::api::host::FilterComparator::Greater => "greater".into_js(ctx),
            crate::bindings::golem::api::host::FilterComparator::LessEqual => {
                "less-equal".into_js(ctx)
            }
            crate::bindings::golem::api::host::FilterComparator::Less => "less".into_js(ctx),
        }
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::FilterComparator {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let value = value
            .as_string()
            .ok_or_else(|| {
                rquickjs::Error::new_from_js_message(
                    "JS filter-comparator",
                    "WIT filter-comparator",
                    "Expected a string",
                )
            })?
            .to_string()?;
        match value.as_str() {
            "equal" => Ok(crate::bindings::golem::api::host::FilterComparator::Equal),
            "not-equal" => Ok(crate::bindings::golem::api::host::FilterComparator::NotEqual),
            "greater-equal" => {
                Ok(crate::bindings::golem::api::host::FilterComparator::GreaterEqual)
            }
            "greater" => Ok(crate::bindings::golem::api::host::FilterComparator::Greater),
            "less-equal" => Ok(crate::bindings::golem::api::host::FilterComparator::LessEqual),
            "less" => Ok(crate::bindings::golem::api::host::FilterComparator::Less),
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS filter-comparator",
                "WIT filter-comparator",
                format!("Unknown case value: {value}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::StringFilterComparator {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        match self {
            crate::bindings::golem::api::host::StringFilterComparator::Equal => {
                "equal".into_js(ctx)
            }
            crate::bindings::golem::api::host::StringFilterComparator::NotEqual => {
                "not-equal".into_js(ctx)
            }
            crate::bindings::golem::api::host::StringFilterComparator::Like => "like".into_js(ctx),
            crate::bindings::golem::api::host::StringFilterComparator::NotLike => {
                "not-like".into_js(ctx)
            }
        }
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::StringFilterComparator {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let value = value
            .as_string()
            .ok_or_else(|| {
                rquickjs::Error::new_from_js_message(
                    "JS string-filter-comparator",
                    "WIT string-filter-comparator",
                    "Expected a string",
                )
            })?
            .to_string()?;
        match value.as_str() {
            "equal" => Ok(crate::bindings::golem::api::host::StringFilterComparator::Equal),
            "not-equal" => Ok(crate::bindings::golem::api::host::StringFilterComparator::NotEqual),
            "like" => Ok(crate::bindings::golem::api::host::StringFilterComparator::Like),
            "not-like" => Ok(crate::bindings::golem::api::host::StringFilterComparator::NotLike),
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS string-filter-comparator",
                "WIT string-filter-comparator",
                format!("Unknown case value: {value}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::WorkerStatus {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        match self {
            crate::bindings::golem::api::host::WorkerStatus::Running => "running".into_js(ctx),
            crate::bindings::golem::api::host::WorkerStatus::Idle => "idle".into_js(ctx),
            crate::bindings::golem::api::host::WorkerStatus::Suspended => "suspended".into_js(ctx),
            crate::bindings::golem::api::host::WorkerStatus::Interrupted => {
                "interrupted".into_js(ctx)
            }
            crate::bindings::golem::api::host::WorkerStatus::Retrying => "retrying".into_js(ctx),
            crate::bindings::golem::api::host::WorkerStatus::Failed => "failed".into_js(ctx),
            crate::bindings::golem::api::host::WorkerStatus::Exited => "exited".into_js(ctx),
        }
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::WorkerStatus {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let value = value
            .as_string()
            .ok_or_else(|| {
                rquickjs::Error::new_from_js_message(
                    "JS worker-status",
                    "WIT worker-status",
                    "Expected a string",
                )
            })?
            .to_string()?;
        match value.as_str() {
            "running" => Ok(crate::bindings::golem::api::host::WorkerStatus::Running),
            "idle" => Ok(crate::bindings::golem::api::host::WorkerStatus::Idle),
            "suspended" => Ok(crate::bindings::golem::api::host::WorkerStatus::Suspended),
            "interrupted" => Ok(crate::bindings::golem::api::host::WorkerStatus::Interrupted),
            "retrying" => Ok(crate::bindings::golem::api::host::WorkerStatus::Retrying),
            "failed" => Ok(crate::bindings::golem::api::host::WorkerStatus::Failed),
            "exited" => Ok(crate::bindings::golem::api::host::WorkerStatus::Exited),
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS worker-status",
                "WIT worker-status",
                format!("Unknown case value: {value}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::WorkerNameFilter {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let comparator: crate::bindings::golem::api::host::StringFilterComparator = self.comparator;
        obj.set("comparator", comparator)?;
        let value: String = self.value;
        obj.set("value", value)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::WorkerNameFilter {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let comparator: crate::bindings::golem::api::host::StringFilterComparator =
            obj.get("comparator")?;
        let comparator: crate::bindings::golem::api::host::StringFilterComparator = comparator;
        let value: String = obj.get("value")?;
        let value: String = value;
        Ok(Self { comparator, value })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::WorkerStatusFilter {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let comparator: crate::bindings::golem::api::host::FilterComparator = self.comparator;
        obj.set("comparator", comparator)?;
        let value: crate::bindings::golem::api::host::WorkerStatus = self.value;
        obj.set("value", value)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::WorkerStatusFilter {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let comparator: crate::bindings::golem::api::host::FilterComparator =
            obj.get("comparator")?;
        let comparator: crate::bindings::golem::api::host::FilterComparator = comparator;
        let value: crate::bindings::golem::api::host::WorkerStatus = obj.get("value")?;
        let value: crate::bindings::golem::api::host::WorkerStatus = value;
        Ok(Self { comparator, value })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::WorkerVersionFilter {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let comparator: crate::bindings::golem::api::host::FilterComparator = self.comparator;
        obj.set("comparator", comparator)?;
        let value: u64 = self.value;
        obj.set("value", value)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::WorkerVersionFilter {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let comparator: crate::bindings::golem::api::host::FilterComparator =
            obj.get("comparator")?;
        let comparator: crate::bindings::golem::api::host::FilterComparator = comparator;
        let value: u64 = obj.get("value")?;
        let value: u64 = value;
        Ok(Self { comparator, value })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::WorkerCreatedAtFilter {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let comparator: crate::bindings::golem::api::host::FilterComparator = self.comparator;
        obj.set("comparator", comparator)?;
        let value: u64 = self.value;
        obj.set("value", value)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::WorkerCreatedAtFilter {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let comparator: crate::bindings::golem::api::host::FilterComparator =
            obj.get("comparator")?;
        let comparator: crate::bindings::golem::api::host::FilterComparator = comparator;
        let value: u64 = obj.get("value")?;
        let value: u64 = value;
        Ok(Self { comparator, value })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::WorkerEnvFilter {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let name: String = self.name;
        obj.set("name", name)?;
        let comparator: crate::bindings::golem::api::host::StringFilterComparator = self.comparator;
        obj.set("comparator", comparator)?;
        let value: String = self.value;
        obj.set("value", value)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::WorkerEnvFilter {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let name: String = obj.get("name")?;
        let name: String = name;
        let comparator: crate::bindings::golem::api::host::StringFilterComparator =
            obj.get("comparator")?;
        let comparator: crate::bindings::golem::api::host::StringFilterComparator = comparator;
        let value: String = obj.get("value")?;
        let value: String = value;
        Ok(Self {
            name,
            comparator,
            value,
        })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::WorkerPropertyFilter {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        match self {
            crate::bindings::golem::api::host::WorkerPropertyFilter::Name(inner) => {
                obj.set(crate::wrappers::TAG, "name")?;
                let case_value: crate::bindings::golem::api::host::WorkerNameFilter = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::api::host::WorkerPropertyFilter::Status(inner) => {
                obj.set(crate::wrappers::TAG, "status")?;
                let case_value: crate::bindings::golem::api::host::WorkerStatusFilter = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::api::host::WorkerPropertyFilter::Version(inner) => {
                obj.set(crate::wrappers::TAG, "version")?;
                let case_value: crate::bindings::golem::api::host::WorkerVersionFilter = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::api::host::WorkerPropertyFilter::CreatedAt(inner) => {
                obj.set(crate::wrappers::TAG, "created-at")?;
                let case_value: crate::bindings::golem::api::host::WorkerCreatedAtFilter = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::api::host::WorkerPropertyFilter::Env(inner) => {
                obj.set(crate::wrappers::TAG, "env")?;
                let case_value: crate::bindings::golem::api::host::WorkerEnvFilter = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
        }
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::WorkerPropertyFilter {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let tag: String = obj.get(crate::wrappers::TAG)?;
        match tag.as_str() {
            "name" => {
                let inner: crate::bindings::golem::api::host::WorkerNameFilter =
                    obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::api::host::WorkerPropertyFilter::Name(inner))
            }
            "status" => {
                let inner: crate::bindings::golem::api::host::WorkerStatusFilter =
                    obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::api::host::WorkerPropertyFilter::Status(inner))
            }
            "version" => {
                let inner: crate::bindings::golem::api::host::WorkerVersionFilter =
                    obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::api::host::WorkerPropertyFilter::Version(inner))
            }
            "created-at" => {
                let inner: crate::bindings::golem::api::host::WorkerCreatedAtFilter =
                    obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::api::host::WorkerPropertyFilter::CreatedAt(inner))
            }
            "env" => {
                let inner: crate::bindings::golem::api::host::WorkerEnvFilter =
                    obj.get(crate::wrappers::VALUE)?;
                Ok(crate::bindings::golem::api::host::WorkerPropertyFilter::Env(inner))
            }
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS worker-property-filter",
                "WIT worker-property-filter",
                format!("Unknown variant case: {tag}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::WorkerAllFilter {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let filters: Vec<crate::bindings::golem::api::host::WorkerPropertyFilter> =
            self.filters.into_iter().map(|v| v).collect::<Vec<_>>();
        obj.set("filters", filters)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::WorkerAllFilter {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let filters: Vec<crate::bindings::golem::api::host::WorkerPropertyFilter> =
            obj.get("filters")?;
        let filters: Vec<crate::bindings::golem::api::host::WorkerPropertyFilter> =
            filters.into_iter().map(|v| v).collect::<Vec<_>>();
        Ok(Self { filters })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::WorkerAnyFilter {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let filters: Vec<crate::bindings::golem::api::host::WorkerAllFilter> =
            self.filters.into_iter().map(|v| v).collect::<Vec<_>>();
        obj.set("filters", filters)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::WorkerAnyFilter {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let filters: Vec<crate::bindings::golem::api::host::WorkerAllFilter> =
            obj.get("filters")?;
        let filters: Vec<crate::bindings::golem::api::host::WorkerAllFilter> =
            filters.into_iter().map(|v| v).collect::<Vec<_>>();
        Ok(Self { filters })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::WorkerMetadata {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        let worker_id: crate::bindings::golem::rpc::types::WorkerId = self.worker_id;
        obj.set("workerId", worker_id)?;
        let args: Vec<String> = self.args.into_iter().map(|v| v).collect::<Vec<_>>();
        obj.set("args", args)?;
        let env: Vec<rquickjs::convert::List<(String, String)>> = self
            .env
            .into_iter()
            .map(|v| rquickjs::convert::List(v))
            .collect::<Vec<_>>();
        obj.set("env", env)?;
        let status: crate::bindings::golem::api::host::WorkerStatus = self.status;
        obj.set("status", status)?;
        let component_version: u64 = self.component_version;
        obj.set("componentVersion", component_version)?;
        let retry_count: u64 = self.retry_count;
        obj.set("retryCount", retry_count)?;
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::WorkerMetadata {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let worker_id: crate::bindings::golem::rpc::types::WorkerId = obj.get("workerId")?;
        let worker_id: crate::bindings::golem::api::host::WorkerId = worker_id;
        let args: Vec<String> = obj.get("args")?;
        let args: Vec<String> = args.into_iter().map(|v| v).collect::<Vec<_>>();
        let env: Vec<rquickjs::convert::List<(String, String)>> = obj.get("env")?;
        let env: Vec<(String, String)> = env.into_iter().map(|v| v.0).collect::<Vec<_>>();
        let status: crate::bindings::golem::api::host::WorkerStatus = obj.get("status")?;
        let status: crate::bindings::golem::api::host::WorkerStatus = status;
        let component_version: u64 = obj.get("componentVersion")?;
        let component_version: u64 = component_version;
        let retry_count: u64 = obj.get("retryCount")?;
        let retry_count: u64 = retry_count;
        Ok(Self {
            worker_id,
            args,
            env,
            status,
            component_version,
            retry_count,
        })
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::RevertWorkerTarget {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        let obj = rquickjs::Object::new(ctx.clone())?;
        match self {
            crate::bindings::golem::api::host::RevertWorkerTarget::RevertToOplogIndex(inner) => {
                obj.set(crate::wrappers::TAG, "revert-to-oplog-index")?;
                let case_value: u64 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
            crate::bindings::golem::api::host::RevertWorkerTarget::RevertLastInvocations(inner) => {
                obj.set(crate::wrappers::TAG, "revert-last-invocations")?;
                let case_value: u64 = inner;
                obj.set(crate::wrappers::VALUE, case_value)?;
            }
        }
        Ok(obj.into_value())
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::RevertWorkerTarget {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let obj = rquickjs::Object::from_value(value)?;
        let tag: String = obj.get(crate::wrappers::TAG)?;
        match tag.as_str() {
            "revert-to-oplog-index" => {
                let inner: u64 = obj.get(crate::wrappers::VALUE)?;
                Ok(
                    crate::bindings::golem::api::host::RevertWorkerTarget::RevertToOplogIndex(
                        inner,
                    ),
                )
            }
            "revert-last-invocations" => {
                let inner: u64 = obj.get(crate::wrappers::VALUE)?;
                Ok(
                    crate::bindings::golem::api::host::RevertWorkerTarget::RevertLastInvocations(
                        inner,
                    ),
                )
            }
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS revert-worker-target",
                "WIT revert-worker-target",
                format!("Unknown variant case: {tag}"),
            )),
        }
    }
}
impl<'js> rquickjs::IntoJs<'js> for crate::bindings::golem::api::host::ForkResult {
    fn into_js(self, ctx: &rquickjs::Ctx<'js>) -> rquickjs::Result<rquickjs::Value<'js>> {
        match self {
            crate::bindings::golem::api::host::ForkResult::Original => "original".into_js(ctx),
            crate::bindings::golem::api::host::ForkResult::Forked => "forked".into_js(ctx),
        }
    }
}
impl<'js> rquickjs::FromJs<'js> for crate::bindings::golem::api::host::ForkResult {
    fn from_js(_ctx: &rquickjs::Ctx<'js>, value: rquickjs::Value<'js>) -> rquickjs::Result<Self> {
        let value = value
            .as_string()
            .ok_or_else(|| {
                rquickjs::Error::new_from_js_message(
                    "JS fork-result",
                    "WIT fork-result",
                    "Expected a string",
                )
            })?
            .to_string()?;
        match value.as_str() {
            "original" => Ok(crate::bindings::golem::api::host::ForkResult::Original),
            "forked" => Ok(crate::bindings::golem::api::host::ForkResult::Forked),
            _ => Err(rquickjs::Error::new_from_js_message(
                "JS fork-result",
                "WIT fork-result",
                format!("Unknown case value: {value}"),
            )),
        }
    }
}
